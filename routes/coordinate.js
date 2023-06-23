const express = require('express');
const router = express.Router();
const kdTree = require('kd-tree-javascript').kdTree;
const vincenty = require('node-vincenty');
const NodeCache = require('node-cache');
const validateInput = require('../middlewares/inputValidation');

const cache = new NodeCache();
let tree;

function initializeKdTree() {
  const coordinates = cache.get('coordinates');

  if (!coordinates || coordinates.length === 0) {
    console.log('No coordinates found in cache.');
    return;
  }

  tree = new kdTree(coordinates, (p) => p.longitude, (p) => p.latitude);
}

function addCoordinate(req, res) {
  const { latitude, longitude } = req.body;
  const coordinate = { latitude, longitude };

  let coordinates = cache.get('coordinates');
  if (!coordinates) {
    coordinates = [];
  }

  coordinates.push(coordinate);
  cache.set('coordinates', coordinates);

  if (!tree) {
    initializeKdTree();
  } else {
    tree.insert(coordinate);
  }

  res.sendStatus(200);
}

function findNearestLocation(req, res) {
  const { latitude, longitude } = req.query;
  const target = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

  if (!tree || tree.length === 0) {
    res.status(404).json({ error: 'No coordinates found' });
    return;
  }

  const nearest = tree.nearest(target, 1, (a, b) =>
    vincenty.distVincenty(a.latitude, a.longitude, b.latitude, b.longitude)
  );

  res.json(nearest[0]);
}

router.post('/', validateInput,addCoordinate);
router.get('/nearest',validateInput, findNearestLocation);

module.exports = router;