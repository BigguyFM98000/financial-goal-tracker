const express = require('express');
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getGoals);
router.post('/', addGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
