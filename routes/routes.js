const userRoutes = require('./user.routes.js');
const garantRoutes = require('./garant.routes.js');

const router = (server) => {
  server.use('/users', userRoutes);
  server.use('/garants', garantRoutes);
}

module.exports = router