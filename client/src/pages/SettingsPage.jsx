import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Settings, User, Sliders, Shield, Zap, Sparkles, Moon, Sun, AlertTriangle } from 'lucide-react'
import { toggleTheme } from '../store/uiSlice'
import { authAPI } from '../api/services'
import { updateUser } from '../store/authSlice'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const dispatch = useDispatch()
  const { user } = useSelector(s => s.auth)
  const { theme } = useSelector(s => s.ui)
  const [loading, setLoading] = useState(false)

  const handleToggleTheme = async () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    dispatch(toggleTheme())
    try {
      await authAPI.updateTheme(nextTheme)
      dispatch(updateUser({ theme: nextTheme }))
    } catch (err) {
      toast.error('Failed to save theme preference in cloud.')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="space-y-8 max-w-5xl mx-auto pb-20 md:pb-8 relative"
    >
      {/* Decorative glow */}
      <div className="absolute top-[-100px] right-[-50px] w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)' }} />
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-primary font-bold text-3xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'var(--surface-badge)', border: '1px solid var(--border-primary)' }}>
              <Settings size={20} style={{ color: 'var(--color-primary)' }} />
            </div>
            Workspace Settings
          </h2>
          <p className="text-sm mt-2 ml-1" style={{ color: 'var(--color-muted)' }}>
            Configure preference parameters and profile anchors
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 relative z-10">
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 lg:col-span-3 space-y-4">
          <div className="glass border rounded-3xl p-3 h-fit space-y-1.5"
            style={{ borderColor: 'var(--border-card)', background: 'var(--surface-card)' }}>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-primary rounded-2xl border text-left transition-all relative overflow-hidden" 
              style={{ borderColor: 'var(--border-primary)', background: 'var(--surface-badge)' }}>
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: 'var(--color-primary)' }} />
              <User size={16} style={{ color: 'var(--color-primary)' }} /> Profile Credentials
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-muted-var rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors border border-transparent">
              <Sliders size={16} /> Workspace Preferences
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-muted-var rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors border border-transparent">
              <Shield size={16} /> Security Keys
            </button>
          </div>
        </div>

        {/* Content Panel */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          {/* User Profile */}
          <div className="glass border rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden card-hover"
            style={{ borderColor: 'var(--border-card)', background: 'var(--surface-card)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none ai-visual">
              <img src="/ai_neural_brain.png" alt="" className="w-full h-full object-cover" />
            </div>
            
            <h3 className="text-primary font-bold text-base flex items-center gap-2 relative z-10">
              <User size={18} style={{ color: 'var(--color-primary)' }} /> Account Profile
            </h3>
            
            <div className="flex items-center gap-5 py-2 border-b pb-6 relative z-10" style={{ borderColor: 'var(--border-divider)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-lg"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-cyan))', boxShadow: '0 8px 24px rgba(108,99,255,0.3)' }}>
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'NT'}
              </div>
              <div>
                <h4 className="text-primary font-bold text-base mb-0.5">{user?.name}</h4>
                <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Workspace Operator</p>
              </div>
              
              <div className="ml-auto glass border rounded-xl px-4 py-2.5 flex items-center gap-2"
                style={{ borderColor: 'var(--border-subtle)', background: 'var(--surface-badge)' }}>
                <Zap size={15} style={{ color: 'var(--color-gold)' }} />
                <span className="text-sm font-bold text-primary">{user?.streak || 0} Day Streak</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
              <div>
                <label className="text-[10px] font-semibold text-muted-var mb-1.5 block uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={user?.name || ''} 
                  disabled
                  className="input-nebula px-4 py-2.5 text-xs rounded-xl opacity-60 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-var mb-1.5 block uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={user?.email || ''} 
                  disabled
                  className="input-nebula px-4 py-2.5 text-xs rounded-xl opacity-60 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="glass border rounded-3xl p-6 md:p-8 space-y-6 card-hover"
            style={{ borderColor: 'var(--border-card)', background: 'var(--surface-card)' }}>
            <h3 className="text-primary font-bold text-base flex items-center gap-2">
              <Sliders size={18} style={{ color: 'var(--color-cyan)' }} /> Aesthetics Preferences
            </h3>

            <div className="flex items-center justify-between py-3">
              <div>
                <h4 className="text-primary font-bold text-sm mb-1.5">System Interface Theme</h4>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  Toggle between high contrast light aesthetics and futuristic dark mode
                </p>
              </div>
              <button 
                onClick={handleToggleTheme}
                className="glass border px-5 py-2.5 text-sm font-bold rounded-xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95"
                style={{ borderColor: 'var(--border-primary)', background: 'var(--surface-badge)', color: 'var(--text-primary)' }}
              >
                {theme === 'dark' ? (
                  <><Moon size={15} style={{ color: 'var(--color-primary)' }} /> Dark Active</>
                ) : (
                  <><Sun size={15} style={{ color: 'var(--color-gold)' }} /> Light Active</>
                )}
              </button>
            </div>
          </div>

          {/* System status */}
          <div className="glass border rounded-3xl p-6 md:p-8 border-red-500/20 relative overflow-hidden" style={{ background: 'rgba(255,77,109,0.02)' }}>
            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none" style={{ background: '#FF4D6D' }} />
            <h3 className="text-red-500 font-bold text-base flex items-center gap-2 mb-3 relative z-10">
              <AlertTriangle size={18} /> Danger Controls
            </h3>
            <p className="text-xs mb-5 relative z-10 font-medium" style={{ color: 'var(--color-muted)' }}>
              Executing the action below will completely clear all local caching indices. This action is irreversible.
            </p>
            <button className="px-5 py-2.5 rounded-xl text-sm font-bold border relative z-10 transition-all hover:scale-105 active:scale-95"
              style={{ background: 'rgba(255,77,109,0.1)', borderColor: 'rgba(255,77,109,0.3)', color: '#FF4D6D', boxShadow: '0 0 20px rgba(255,77,109,0.15)' }}>
              Flush Local Cache
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
