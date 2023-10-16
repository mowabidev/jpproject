const userRoutes = require('./user.routes.js');
const garantRoutes = require('./garant.routes.js');
const amountRoutes = require('./subscription.routes.js');
const creditRoutes = require('./credit.routes.js');

const router = (server) => {
  server.use('/users', userRoutes);
  server.use('/garants', garantRoutes);
  server.use('/amount', amountRoutes);
  server.use('/credit', creditRoutes);
}

module.exports = router