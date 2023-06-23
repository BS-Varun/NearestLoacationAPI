function validateInput(req, res, next) {
    const { latitude, longitude } = req.body;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
  
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
    }
  
    next();
  }
  
  module.exports = validateInput;