const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const config = require('./config/config');

//this just executes the file, no export needed
require('./models/User');
require('./models/ExpertArea');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

//need to put authroutes after passport.initialize() so passport is happy

require('./routes/authRoutes')(app);
require('./routes/mainRoutes')(app);

const registrationRoutes = require('./routes/registrationRoutes');
app.use('/api', registrationRoutes);

const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profile', profileRoutes);

// app.post('/api/profile/update', (req, res) => {
//   res.send('a response from profileRoutes');
// });
// app.get('/', (req, res) => {
//   res.send({ hi: 'there' });
// });

if (process.env.NODE_ENV == 'production') {
  //try to serve up production assets such as main.js or main.css
  app.use(express.static('client/build'));

  //if not, they are probably requesting a route so serve up index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);

module.exports = { app };
