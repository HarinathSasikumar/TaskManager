const Task = require('../models/Task');

// @desc    Get all tasks for user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status, priority, search, sort = '-createdAt' } = req.query;
    const filter = { user: req.user._id };

    if (status && status !== 'all') filter.status = status;
    if (priority && priority !== 'all') filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const tasks = await Task.find(filter).sort(sort).lean();
    const total = await Task.countDocuments({ user: req.user._id });
    const completed = await Task.countDocuments({ user: req.user._id, status: 'completed' });
    const pending = await Task.countDocuments({ user: req.user._id, status: 'pending' });
    const inProgress = await Task.countDocuments({ user: req.user._id, status: 'in-progress' });

    res.json({
      success: true,
      tasks,
      stats: { total, completed, pending, inProgress, completionRate: total > 0 ? Math.round((completed / total) * 100) : 0 }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, priority, deadline, tags, color, status } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Task title is required.' });
    }

    const task = await Task.create({
      user: req.user._id,
      title: title.trim(),
      description: description?.trim() || '',
      priority: priority || 'medium',
      deadline: deadline || null,
      tags: tags || [],
      color: color || '#6C63FF',
      status: status || 'pending'
    });

    res.status(201).json({ success: true, task, message: 'Task created!' });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }

    const { title, description, status, priority, deadline, tags, color, order } = req.body;

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (deadline !== undefined) task.deadline = deadline;
    if (tags !== undefined) task.tags = tags;
    if (color !== undefined) task.color = color;
    if (order !== undefined) task.order = order;

    await task.save();
    res.json({ success: true, task, message: 'Task updated!' });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    res.json({ success: true, message: 'Task deleted!' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Get weekly productivity stats
// @route   GET /api/tasks/stats/weekly
// @access  Private
const getWeeklyStats = async (req, res) => {
  try {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));

      const created = await Task.countDocuments({ user: req.user._id, createdAt: { $gte: start, $lte: end } });
      const completed = await Task.countDocuments({ user: req.user._id, completedAt: { $gte: start, $lte: end } });

      days.push({
        date: start.toLocaleDateString('en-US', { weekday: 'short' }),
        created,
        completed
      });
    }
    res.json({ success: true, weekly: days });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Bulk update order (drag & drop)
// @route   PUT /api/tasks/reorder
// @access  Private
const reorderTasks = async (req, res) => {
  try {
    const { tasks } = req.body; // Array of { _id, order }
    const bulkOps = tasks.map(t => ({
      updateOne: {
        filter: { _id: t._id, user: req.user._id },
        update: { $set: { order: t.order } }
      }
    }));
    await Task.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Tasks reordered!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getWeeklyStats, reorderTasks };
