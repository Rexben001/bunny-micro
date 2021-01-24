const express = require('express');
const {
  GetUser,
  ListAllUsers,
  DeleteUser,
  UpdateUser,
  AddNewUser,
} = require('../controllers/user');

const { validateUserBodyRequest } = require('../middlewares');

const router = express.Router();

router.post('/users/create', validateUserBodyRequest, AddNewUser);
router.get('/users/all', ListAllUsers);
router.get('/users/:id', GetUser);
router.put('/users/:id', validateUserBodyRequest, UpdateUser);
router.delete('/users/:id', DeleteUser);

module.exports = router;
