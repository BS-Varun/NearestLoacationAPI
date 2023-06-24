// Validate input coordinates
function validateCoordinates(latitude, longitude) {
    const errors = [];
  
    if (!latitude || isNaN(parseFloat(latitude))) {
      errors.push('Latitude is invalid or missing');
    }
  
    if (!longitude || isNaN(parseFloat(longitude))) {
      errors.push('Longitude is invalid or missing');
    }
  
    return errors;
  }
  
  module.exports = { validateCoordinates };
  