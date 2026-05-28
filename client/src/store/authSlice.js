import { createSlice } from '@reduxjs/toolkit'

const stored = localStorage.getItem('nebula_auth')
const initial = stored ? JSON.parse(stored) : { user: null, token: null, loading: false, error: null }

const authSlice = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {
    setCredentials(state, { payload }) {
      state.user = payload.user
      state.token = payload.token
      state.error = null
      localStorage.setItem('nebula_auth', JSON.stringify({ user: payload.user, token: payload.token }))
    },
    updateUser(state, { payload }) {
      state.user = { ...state.user, ...payload }
      localStorage.setItem('nebula_auth', JSON.stringify({ user: state.user, token: state.token }))
    },
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem('nebula_auth')
    },
    setLoading(state, { payload }) { state.loading = payload },
    setError(state, { payload }) { state.error = payload },
  }
})

export const { setCredentials, updateUser, logout, setLoading, setError } = authSlice.actions
export default authSlice.reducer
