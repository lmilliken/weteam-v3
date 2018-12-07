const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const config = require('./config/config');

//this just executes the file, no export needed
require('./models/User');
require('./services/passport-setup');

mongoose.connect(
  config.mongodb.dbURI,
  { useNewUrlParser: true }
);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//need to put authroutes after passport.initialize() so passport is happy
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
