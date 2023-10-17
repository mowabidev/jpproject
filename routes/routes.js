const userRoutes = require('./user.routes.js');
const garantRoutes = require('./garant.routes.js');
const subscriptionRoutes = require('./subscription.routes.js');
const creditRoutes = require('./credit.routes.js');
const loanRoutes = require('./loan.routes.js');
const penalityRoutes = require('./penality.routes.js');
const settingRoutes = require('./setting.routes.js');

const router = (server) => {
  server.use('/user', userRoutes);
  server.use('/garant', garantRoutes);
  server.use('/subscription', subscriptionRoutes);
  server.use('/credit', creditRoutes);
  server.use('/loan', loanRoutes);
  server.use('/penality', penalityRoutes);
  server.use('/setting', settingRoutes);
}

module.exports = router