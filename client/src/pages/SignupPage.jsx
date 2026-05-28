import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { authAPI } from '../api/services'
import { setCredentials } from '../store/authSlice'

const passwordChecks = (pw) => [
  { label: 'At least 6 characters', ok: pw.length >= 6 },
  { label: 'Contains a letter', ok: /[a-zA-Z]/.test(pw) },
  { label: 'Contains a number', ok: /\d/.test(pw) },
]

export default function SignupPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const checks = passwordChecks(form.password)

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      const { data } = await authAPI.register(form)
      dispatch(setCredentials({ user: data.user, token: data.token }))
      toast.success(`Welcome to HARINOVA AI, ${data.user.name.split(' ')[0]}! 🎉`)
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-10" style={{ background: 'var(--color-bg)' }}>
      <div className="aurora-bg">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }}>
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-2xl text-white">HARINOVA AI</span>
        </div>

        <div className="glass-strong border rounded-3xl p-8" style={{ borderColor: 'rgba(108,99,255,0.2)' }}>
          <h1 className="font-display font-bold text-2xl text-white mb-1">Create your workspace</h1>
          <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>Start your productivity journey today — free forever</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-sm"
              style={{ background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.3)', color: '#FF4D6D' }}
            >
              <AlertCircle size={15} /> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--color-muted)' }}>Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
                <input
                  type="text" name="name" value={form.name}
                  onChange={handleChange} placeholder="John Doe"
                  className="input-nebula pl-11 pr-4 py-3 text-sm"
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--color-muted)' }}>Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="you@example.com"
                  className="input-nebula pl-11 pr-4 py-3 text-sm"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--color-muted)' }}>Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password" value={form.password}
                  onChange={handleChange} placeholder="••••••••"
                  className="input-nebula pl-11 pr-12 py-3 text-sm"
                  autoComplete="new-password"
                />
                <button
                  type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-white"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {form.password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 space-y-1.5"
                >
                  {checks.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 size={12} style={{ color: c.ok ? '#00E5A0' : 'var(--color-muted)' }} />
                      <span style={{ color: c.ok ? '#00E5A0' : 'var(--color-muted)' }}>{c.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 mt-2"
              style={{ background: 'linear-gradient(135deg,#6C63FF,#a855f7)', boxShadow: loading ? 'none' : '0 0 30px rgba(108,99,255,0.3)' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Sparkles size={16} /> Create Workspace <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold transition-colors hover:text-white" style={{ color: '#6C63FF' }}>
              Sign in
            </Link>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to="/" className="text-xs transition-colors hover:text-white" style={{ color: 'var(--color-muted)' }}>
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
