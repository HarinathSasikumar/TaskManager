import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { authAPI } from '../api/services'
import { setCredentials } from '../store/authSlice'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    try {
      const { data } = await authAPI.login(form)
      dispatch(setCredentials({ user: data.user, token: data.token }))
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}! 🚀`)
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: 'var(--color-bg)' }}>

      {/* LEFT — Cinematic AI Illustration Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/auth_illustration.png"
          alt="AI Workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(5,5,16,0.3) 0%, rgba(108,99,255,0.15) 50%, rgba(5,5,16,0.5) 100%)' }} />
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-end p-10 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }}>
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-2xl text-white">HARINOVA AI</span>
            </div>
            <h2 className="font-display font-black text-4xl text-white mb-3 leading-tight">
              Your AI-Powered<br /><span className="gradient-text">Command Center</span>
            </h2>
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'rgba(232,232,240,0.7)' }}>
              Join thousands of elite professionals managing tasks, tracking goals, and achieving more with cinematic precision.
            </p>
            {/* Floating stat badges */}
            <div className="flex gap-3 mt-6">
              {[{ v: '94%', l: 'Avg Completion' }, { v: '2M+', l: 'Tasks Done' }, { v: '4.9★', l: 'Rated' }].map((s, i) => (
                <div key={i} className="glass-strong border rounded-xl px-3 py-2 text-center" style={{ borderColor: 'rgba(108,99,255,0.3)' }}>
                  <div className="text-sm font-black gradient-text">{s.v}</div>
                  <div className="text-[10px]" style={{ color: 'rgba(232,232,240,0.6)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT — Login Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center relative px-6 py-12">
        {/* Aurora orbs behind form */}
        <div className="aurora-bg">
          <div className="aurora-orb aurora-orb-1" style={{ opacity: 0.08 }} />
          <div className="aurora-orb aurora-orb-3" style={{ opacity: 0.06 }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }}>
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-white">HARINOVA AI</span>
          </div>

          <div className="glass-strong border rounded-3xl p-8" style={{ borderColor: 'rgba(108,99,255,0.2)' }}>
            <h1 className="font-display font-bold text-2xl text-white mb-1">Welcome back</h1>
            <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>Sign in to your workspace</p>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-sm"
                style={{ background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.3)', color: '#FF4D6D' }}
              >
                <AlertCircle size={15} />{error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--color-muted)' }}>Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com" className="input-nebula pl-11 pr-4 py-3 text-sm" autoComplete="email" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--color-muted)' }}>Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
                  <input type={showPass ? 'text' : 'password'} name="password" value={form.password}
                    onChange={handleChange} placeholder="••••••••" className="input-nebula pl-11 pr-12 py-3 text-sm" autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPass(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-white"
                    style={{ color: 'var(--color-muted)' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 mt-2"
                style={{ background: 'linear-gradient(135deg,#6C63FF,#a855f7)', boxShadow: loading ? 'none' : '0 0 30px rgba(108,99,255,0.3)' }}>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (<>Sign In <ArrowRight size={16} /></>)}
              </button>
            </form>

            <div className="mt-6 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold transition-colors hover:text-white" style={{ color: '#6C63FF' }}>Create one free</Link>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="text-xs transition-colors hover:text-white" style={{ color: 'var(--color-muted)' }}>← Back to home</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
