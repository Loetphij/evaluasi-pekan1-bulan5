const express = require('express');
const app = express();

const requestId = require('./middleware/requestId');
const processTime = require('./middleware/timer');
const errorHandler = require('./middleware/errorHandler');

const routes = require('./routes');

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Perpustakaan berjalan dengan baik. Gunakan /api/books atau /api/authors'
  });
});


app.use(express.json());
app.use(requestId);
app.use(processTime);

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;