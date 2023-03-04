const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const userExerciseController = require('../controllers/UserExerciseController');

const BASE_URL = '/api/users';

router.post(BASE_URL, userController.create);
router.get(BASE_URL, userController.getAll);
router.get(`${BASE_URL}/:id`, userController.getSingle);
router.put(BASE_URL, userController.update);
router.delete(`${BASE_URL}/:id`, userController.delete);

router.post(`${BASE_URL}/:id/exercises`, userExerciseController.create);
router.get(`${BASE_URL}/:id/logs`, userExerciseController.getLogs);

module.exports = router;