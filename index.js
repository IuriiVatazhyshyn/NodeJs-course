require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3000;

connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());

app.use('/', require('./routes/router'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});