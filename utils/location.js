const kdTree = require('kd-tree-javascript');
const vincenty = require('node-vincenty');

// Set of coordinates (example data)
const coordinates = [
  { name: 'Location 1', latitude: 37.7749, longitude: -122.4194 },
  { name: 'Location 2', latitude: 34.0522, longitude: -118.2437 },
  { name: 'Location 3', latitude: 40.7128, longitude: -74.0060 },
  // Add more coordinates as needed
];

// Build a k-d tree from the set of coordinates
const tree = new kdTree.kdTree(coordinates, distance, ['latitude', 'longitude']);

// Custom distance function using Vincenty formula
function distance(coord1, coord2) {
  return vincenty.distVincenty(coord1.latitude, coord1.longitude, coord2.latitude, coord2.longitude).distance;
}

// Find the nearest location from a set of coordinates using the k-d tree
function findNearestLocation(targetLatitude, targetLongitude) {
  const target = { latitude: targetLatitude, longitude: targetLongitude };
  const nearest = tree.nearest(target, 1);

  return nearest.length > 0 ? nearest[0][0] : null;
}

module.exports = { findNearestLocation };
