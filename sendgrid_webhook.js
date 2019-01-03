var localtunnel = require('localtunnel');

//sets up local tunnel server and tells it to forward requests to port 5000
localtunnel(5000, { subdomain: 'lxmemaily' }, function(err, tunnel) {
  console.log('LocalTunnel running');
});
