import api from './axios'

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateTheme: (theme) => api.put('/auth/theme', { theme }),
}

export const tasksAPI = {
  getAll: (params) => api.get('/tasks', { params }),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  remove: (id) => api.delete(`/tasks/${id}`),
  getWeekly: () => api.get('/tasks/stats/weekly'),
  reorder: (tasks) => api.put('/tasks/reorder', { tasks }),
}
