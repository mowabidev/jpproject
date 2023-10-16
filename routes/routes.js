const userRoutes = require('./user.routes.js');
const garantRoutes = require('./garant.routes.js');
const subscriptionRoutes = require('./subscription.routes.js');
const creditRoutes = require('./credit.routes.js');

const router = (server) => {
  server.use('/users', userRoutes);
  server.use('/garants', garantRoutes);
  server.use('/subscription', subscriptionRoutes);
  server.use('/credit', creditRoutes);
}

module.exports = router