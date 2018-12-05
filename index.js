const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/config');

//this just executes the file, no export needed
require('./models/User');
require('./services/passport-setup');

mongoose.connect(config.mongodb.dbURI);

const app = express();
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
