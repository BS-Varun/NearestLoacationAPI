const express = require('express');
const coordinateRoutes = require('./routes/coordinate');

const app = express();
const PORT = 3002;

app.use(express.json());


app.use('/coordinate', coordinateRoutes);

//Error handling Middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
