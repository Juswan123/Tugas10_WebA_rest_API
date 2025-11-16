const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const path = require('path');

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/books', bookRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
