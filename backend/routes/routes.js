const userRoutes = require('./user.routes.js');
const garantRoutes = require('./garant.routes.js');
const subscriptionRoutes = require('./subscription.routes.js');
const creditRoutes = require('./credit.routes.js');
const loanRoutes = require('./loan.routes.js');
const penalityRoutes = require('./penality.routes.js');
const settingRoutes = require('./setting.routes.js');

const router = (server) => {
  server.use('/users', userRoutes);
  server.use('/garants', garantRoutes);
  server.use('/subscriptions', subscriptionRoutes);
  server.use('/credits', creditRoutes);
  server.use('/loans', loanRoutes);
  server.use('/penalies', penalityRoutes);
  server.use('/settings', settingRoutes);
}

module.exports = router