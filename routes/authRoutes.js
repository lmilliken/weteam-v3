const passport = require('passport');

module.exports = (app) => {
  app.post(
    '/auth/login',
    // passport.authenticate('local', { failureRedirection: '/login' }),
    (req, res) => {
      console.log('/auth/login called: ', req.body);
      res.send('/auth/login called');
    }
  );

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/profile');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
