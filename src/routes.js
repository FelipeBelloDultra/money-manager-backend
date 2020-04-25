const { Router } = require('express');

const routes = Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const BalanceController = require('./app/controllers/BalanceController');
const HistoricController = require('./app/controllers/HistoricController');

const authHeader = require('./app/middlewares/auth');

// User Controller
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

// Session Controller
routes.post('/session', SessionController.store);

routes.use(authHeader);

// User Controller
routes.get('/user', UserController.show);

// Balance Controller
routes.put('/balance/:id', BalanceController.update);

// Historic Controller
routes.get('/historics', HistoricController.index);
routes.get('/historic/:id', HistoricController.show);
routes.delete('/historic/:id', HistoricController.delete);

module.exports = routes;
