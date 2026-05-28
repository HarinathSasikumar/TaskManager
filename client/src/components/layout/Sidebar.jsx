import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, CheckSquare, Settings, LogOut, Sparkles,
  ChevronLeft, ChevronRight, Plus, TrendingUp, Zap
} from 'lucide-react'
import { logout } from '../../store/authSlice'
import { toggleSidebar, openModal } from '../../store/uiSlice'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: '#6C63FF' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks', color: '#00D4FF' },
  { to: '/settings', icon: Settings, label: 'Settings', color: '#a855f7' },
]

export default function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { sidebarOpen } = useSelector(s => s.ui)
  const { user } = useSelector(s => s.auth)
  const { stats } = useSelector(s => s.tasks)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Signed out successfully')
    navigate('/')
  }

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'NT'

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 68 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-full z-30 overflow-hidden"
        style={{
          background: 'var(--surface-sidebar)',
          borderRight: '1px solid var(--border-sidebar)',
          boxShadow: 'var(--shadow-sidebar)'
        }}
      >
        {/* Top glow accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)' }} />

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5" style={{ minHeight: 72, borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="relative min-w-[36px] w-9 h-9">
            <div className="absolute inset-0 rounded-xl blur-md" style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', opacity: 0.7 }} />
            <div className="relative w-full h-full rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }}>
              <Sparkles size={17} className="text-white" />
            </div>
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-display font-black text-lg text-primary leading-none">HARINOVA AI</div>
                <div className="text-[10px] font-semibold tracking-widest uppercase mt-0.5 text-accent"
                  style={{ color: 'var(--color-primary)' }}>AI Workspace</div>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => dispatch(toggleSidebar())}
            className="ml-auto min-w-[28px] w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-black/5 dark:hover:bg-white/10"
            style={{ color: 'var(--text-muted)' }}>
            {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        {/* Quick Add */}
        <div className="px-3 py-4">
          <motion.button
            onClick={() => dispatch(openModal(null))}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg,#6C63FF,#a855f7)',
              boxShadow: '0 0 24px rgba(108,99,255,0.45), 0 4px 16px rgba(0,0,0,0.3)'
            }}
          >
            {/* shimmer sweep */}
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
            />
            <Plus size={16} className="relative z-10 min-w-[16px]" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative z-10">New Task</motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label, color }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <div className="relative min-w-[17px]">
                    {isActive && (
                      <motion.div
                        layoutId="nav-glow"
                        className="absolute -inset-1 rounded-md blur-sm"
                        style={{ background: color, opacity: 0.4 }}
                      />
                    )}
                    <Icon size={17} className="relative z-10" style={{ color: isActive ? color : undefined }} />
                  </div>
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="whitespace-nowrap" style={{ color: isActive ? '#ffffff' : undefined }}>
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && sidebarOpen && (
                    <motion.div layoutId="nav-dot" className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Progress Card */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mx-3 mb-3 rounded-2xl p-4 relative overflow-hidden"
              style={{
                background: 'var(--surface-badge)',
                border: '1px solid var(--border-primary)',
                boxShadow: '0 0 20px rgba(108,99,255,0.1) inset'
              }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.06]">
                <img src="/ai_insight_widget.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <Zap size={12} style={{ color: 'var(--color-gold)' }} />
                <span className="text-xs font-bold text-primary">Today's Progress</span>
              </div>
              <div className="flex items-end justify-between mb-2 relative z-10">
                <span className="text-2xl font-display font-black gradient-text">{stats.completionRate}%</span>
                <span className="text-xs font-semibold text-muted-var">{stats.completed} done</span>
              </div>
              <div className="progress-bar relative z-10">
                <motion.div className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.completionRate}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User + Logout */}
        <div className="px-3 pb-4 pt-3" style={{ borderTop: '1px solid var(--border-divider)' }}>
          <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl mb-2 transition-all hover:bg-white/5 cursor-default">
            <div className="relative min-w-[34px] w-[34px] h-[34px]">
              <div className="absolute inset-0 rounded-full blur-sm" style={{ background: 'linear-gradient(135deg,#6C63FF,#a855f7)', opacity: 0.6 }} />
              <div className="relative w-full h-full rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#6C63FF,#a855f7)' }}>
                {initials}
              </div>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-primary truncate">{user?.name}</div>
                  <div className="text-[10px] truncate text-muted-var">{user?.email}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-red-500/10 hover:scale-[1.02]"
            style={{ color: '#ff6b87', border: '1px solid transparent' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,77,109,0.2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
          >
            <LogOut size={15} className="min-w-[15px]" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Sign Out</motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.3), transparent)' }} />
      </motion.aside>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-around"
        style={{
          background: 'var(--surface-navbar)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid var(--border-navbar)',
          boxShadow: 'var(--shadow-navbar)'
        }}>
        {navItems.map(({ to, icon: Icon, label, color }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${isActive ? 'scale-110' : ''}`
            }
            style={({ isActive }) => ({ color: isActive ? color : 'var(--text-faint)' })}>
            {({ isActive }) => (
              <>
                <div className="relative">
                  {isActive && <div className="absolute inset-0 blur-md rounded-full" style={{ background: color, opacity: 0.5 }} />}
                  <Icon size={20} className="relative z-10" />
                </div>
                <span className="text-xs font-semibold">{label}</span>
              </>
            )}
          </NavLink>
        ))}
        <button onClick={() => dispatch(openModal(null))}
          className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl"
          style={{ color: '#6C63FF' }}>
          <Plus size={20} />
          <span className="text-xs font-semibold">New</span>
        </button>
      </div>
    </>
  )
}
