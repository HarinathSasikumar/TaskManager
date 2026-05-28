import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Search, Bell, Sun, Moon, Sparkles } from 'lucide-react'
import { toggleTheme } from '../../store/uiSlice'
import toast from 'react-hot-toast'

const pageTitles = {
  dashboard: { label: 'Dashboard', sub: 'Welcome back to your AI workspace' },
  tasks: { label: 'Tasks', sub: 'Manage and organize your workflow' },
  settings: { label: 'Settings', sub: 'Customize your experience' },
}

export default function Navbar() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { theme } = useSelector(s => s.ui)

  const path = location.pathname.replace('/', '')
  const page = pageTitles[path] || { label: 'HARINOVA AI', sub: 'AI Workspace' }

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6"
      style={{
        height: 72,
        background: 'var(--surface-navbar)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border-navbar)',
        boxShadow: 'var(--shadow-navbar)'
      }}
    >
      {/* Top neon accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.5), rgba(0,212,255,0.3), transparent)' }} />

      {/* Left — Page Title */}
      <motion.div key={path} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-display font-black text-xl leading-none text-primary">{page.label}</h1>
            <p className="text-[11px] font-medium mt-0.5 text-muted-var">{page.sub}</p>
          </div>
        </div>
      </motion.div>

      {/* Right — Controls */}
      <div className="flex items-center gap-3">
        {/* Search bar */}
        <div className="hidden md:flex relative group">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors group-focus-within:text-accent"
            style={{ color: 'var(--text-faint)' }} />
          <input
            type="text"
            placeholder="Search anything..."
            className="input-nebula pl-10 pr-4 py-2 text-sm rounded-full"
            style={{ width: 230 }}
          />
        </div>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          onClick={() => dispatch(toggleTheme())}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{
            background: 'var(--surface-input)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)'
          }}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </motion.button>

        {/* Notifications */}
        <motion.button
          onClick={() => toast('No new AI notifications at the moment.', { icon: '🔔' })}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
          className="w-9 h-9 relative rounded-xl flex items-center justify-center transition-all"
          style={{
            background: 'var(--surface-input)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)'
          }}
        >
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: '#FF4D6D', boxShadow: '0 0 8px rgba(255,77,109,0.8)' }} />
        </motion.button>

        {/* AI Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
          style={{
            background: 'var(--surface-badge)',
            border: '1px solid var(--border-primary)',
            color: 'var(--text-accent)'
          }}>
          <Sparkles size={11} />
          <span>AI On</span>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#00D4FF', boxShadow: '0 0 6px #00D4FF' }} />
        </div>
      </div>
    </header>
  )
}
