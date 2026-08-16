const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: "API Connect inicializada com sucesso!" });
});

module.exports = app;