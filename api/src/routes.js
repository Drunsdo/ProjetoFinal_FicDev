const { Router, request } = require('express');

const { SalaController } = require('./controllers/sala');
const { UserController } = require('./controllers/user');
const {LeitoController} = require('./controllers/leito');
const {ReservaController} = require('./controllers/reserva');
const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

const salaController = new SalaController();
const userController = new UserController();
const leitoController = new LeitoController();
const reservaController = new ReservaController();

routes.post('/sala', authMiddleware, salaController.create);
routes.get('/salas', authMiddleware, salaController.getAll);
routes.get('/sala/:id', authMiddleware, salaController.getById);
routes.delete('/sala/:id', authMiddleware, salaController.delete);
routes.put('/sala/:id', authMiddleware, salaController.update);

routes.post('/reserva', authMiddleware, reservaController.create);
routes.get('/reservas', authMiddleware, reservaController.getAll);
routes.get('/reserva/:id', authMiddleware, reservaController.getById);
routes.delete('/reserva/:id', authMiddleware, reservaController.delete);
routes.put('/reserva/:id', authMiddleware, reservaController.update);

routes.post('/leito', authMiddleware, leitoController.create);
routes.get('/leitos', authMiddleware, leitoController.getAll);
routes.get('/leito/:id', leitoController.getById);
routes.delete('/leito/:id', authMiddleware, leitoController.delete);
routes.put('/leito/:id', authMiddleware, leitoController.update);

routes.post('/register', userController.register);
routes.post('/login', userController.login);
routes.get('/user/:id', authMiddleware, userController.getUser);
routes.put('/user/:id', authMiddleware, userController.updateUser);
routes.delete('/user/:id', authMiddleware, userController.deleteUser);

module.exports = { routes };
