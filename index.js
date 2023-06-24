const express = require('express');
const NodeCache = require('node-cache');
const { findNearestLocation } = require('./utils/location');
const { validateCoordinates } = require('./utils/validation');

const app = express();
const cache = new NodeCache({ stdTTL: 60 }); // Cache TTL set to 60 seconds

// API endpoint to find the nearest location
app.get('/nearest-location', (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate input coordinates
  const validationErrors = validateCoordinates(latitude, longitude);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  // Generate cache key based on coordinates
  const cacheKey = `${latitude}-${longitude}`;

  try {
    // Check if the result is already in cache
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return res.json(cachedResult);
    }

    // Convert coordinates to numbers
    const targetLatitude = parseFloat(latitude);
    const targetLongitude = parseFloat(longitude);

    const nearestLocation = findNearestLocation(targetLatitude, targetLongitude);

    if (!nearestLocation) {
      return res.status(404).json({ error: 'No nearest location found' });
    }

    // Store the result in cache
    cache.set(cacheKey, nearestLocation);

    res.json(nearestLocation);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
