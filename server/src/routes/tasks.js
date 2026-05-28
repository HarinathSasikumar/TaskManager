const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getWeeklyStats,
  reorderTasks
} = require('../controllers/taskController');

router.use(protect); // All task routes protected

router.get('/', getTasks);
router.post('/', createTask);
router.get('/stats/weekly', getWeeklyStats);
router.put('/reorder', reorderTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
