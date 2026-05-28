import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    stats: { total: 0, completed: 0, pending: 0, inProgress: 0, completionRate: 0 },
    weekly: [],
    loading: false,
    error: null,
    filter: { status: 'all', priority: 'all', search: '' },
  },
  reducers: {
    setTasks(state, { payload }) {
      state.items = payload.tasks
      state.stats = payload.stats
      state.loading = false
    },
    setWeekly(state, { payload }) {
      state.weekly = payload
    },
    addTask(state, { payload }) {
      state.items.unshift(payload)
      state.stats.total += 1
      if (payload.status === 'pending') state.stats.pending += 1
      if (payload.status === 'in-progress') state.stats.inProgress += 1
      state.stats.completionRate = state.stats.total > 0
        ? Math.round((state.stats.completed / state.stats.total) * 100) : 0
    },
    updateTask(state, { payload }) {
      const idx = state.items.findIndex(t => t._id === payload._id)
      if (idx !== -1) {
        const old = state.items[idx]
        state.items[idx] = payload
        // Adjust stats
        if (old.status !== payload.status) {
          if (old.status === 'completed') state.stats.completed = Math.max(0, state.stats.completed - 1)
          if (old.status === 'pending') state.stats.pending = Math.max(0, state.stats.pending - 1)
          if (old.status === 'in-progress') state.stats.inProgress = Math.max(0, state.stats.inProgress - 1)
          if (payload.status === 'completed') state.stats.completed += 1
          if (payload.status === 'pending') state.stats.pending += 1
          if (payload.status === 'in-progress') state.stats.inProgress += 1
          state.stats.completionRate = state.stats.total > 0
            ? Math.round((state.stats.completed / state.stats.total) * 100) : 0
        }
      }
    },
    removeTask(state, { payload }) {
      const task = state.items.find(t => t._id === payload)
      if (task) {
        state.items = state.items.filter(t => t._id !== payload)
        state.stats.total = Math.max(0, state.stats.total - 1)
        if (task.status === 'completed') state.stats.completed = Math.max(0, state.stats.completed - 1)
        if (task.status === 'pending') state.stats.pending = Math.max(0, state.stats.pending - 1)
        if (task.status === 'in-progress') state.stats.inProgress = Math.max(0, state.stats.inProgress - 1)
        state.stats.completionRate = state.stats.total > 0
          ? Math.round((state.stats.completed / state.stats.total) * 100) : 0
      }
    },
    reorderTasksLocal(state, { payload }) {
      state.items = payload
    },
    setFilter(state, { payload }) {
      state.filter = { ...state.filter, ...payload }
    },
    setLoading(state, { payload }) { state.loading = payload },
    setError(state, { payload }) { state.error = payload },
  }
})

export const {
  setTasks, setWeekly, addTask, updateTask, removeTask,
  reorderTasksLocal, setFilter, setLoading, setError
} = taskSlice.actions
export default taskSlice.reducer
