import { createSlice } from '@reduxjs/toolkit'

const storedTheme = localStorage.getItem('nebula_theme') || 'dark'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: storedTheme,
    sidebarOpen: true,
    modalOpen: false,
    editingTask: null,
    activeView: 'dashboard',
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('nebula_theme', state.theme)
    },
    setTheme(state, { payload }) {
      state.theme = payload
      localStorage.setItem('nebula_theme', payload)
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen(state, { payload }) {
      state.sidebarOpen = payload
    },
    openModal(state, { payload }) {
      state.modalOpen = true
      state.editingTask = payload || null
    },
    closeModal(state) {
      state.modalOpen = false
      state.editingTask = null
    },
    setActiveView(state, { payload }) {
      state.activeView = payload
    },
  }
})

export const {
  toggleTheme, setTheme, toggleSidebar, setSidebarOpen,
  openModal, closeModal, setActiveView
} = uiSlice.actions
export default uiSlice.reducer
