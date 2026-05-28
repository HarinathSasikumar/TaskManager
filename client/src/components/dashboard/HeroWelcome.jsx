import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Brain, Zap, Target } from 'lucide-react'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { openModal } from '../../store/uiSlice'
import toast from 'react-hot-toast'

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
  }
}

const floatVariants2 = {
  animate: {
    y: [0, 8, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }
  }
}

export default function HeroWelcome() {
  const { user } = useSelector(s => s.auth)
  const { stats } = useSelector(s => s.tasks)
  const dispatch = useDispatch()

  const today = format(new Date(), 'EEEE, MMMM do')
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="relative overflow-hidden rounded-3xl"
      style={{
        minHeight: 260,
        background: 'var(--surface-hero)',
        border: '1px solid var(--border-primary)',
        boxShadow: '0 0 60px rgba(108,99,255,0.12), 0 0 120px rgba(0,212,255,0.05), inset 0 0 80px rgba(108,99,255,0.04)'
      }}>

      {/* Subtle AI robot bg */}
      <div className="absolute inset-0">
        <img src="/ai_hero_robot.png" alt="" className="w-full h-full object-cover object-right"
          style={{ opacity: 0.07, filter: 'blur(4px)' }} />
        <div className="absolute inset-0"
          style={{ background: 'var(--hero-overlay)' }} />
      </div>

      {/* Animated neon top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #6C63FF 30%, #00D4FF 60%, #a855f7 80%, transparent 100%)' }}
        animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Background mesh grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(108,99,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

      {/* Glow blobs */}
      <div className="absolute top-[-40px] left-[20%] w-64 h-64 rounded-full blur-[80px] opacity-20"
        style={{ background: 'radial-gradient(circle, #6C63FF, transparent)' }} />
      <div className="absolute bottom-[-40px] right-[25%] w-48 h-48 rounded-full blur-[60px] opacity-15"
        style={{ background: 'radial-gradient(circle, #00D4FF, transparent)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 p-6 md:p-8">

        {/* Left — Main Text */}
        <div className="flex-1">
          {/* Date badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
            style={{
              background: 'var(--surface-badge)',
              borderColor: 'var(--border-primary)',
              color: 'var(--text-accent)'
            }}
          >
            <span className="ml-1">{today}</span>
          </motion.div>

          {/* Greeting */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display font-black mb-3 leading-[1.1] text-primary"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            <span>{greeting}, </span>
            <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-sm md:text-base mb-6 max-w-md leading-relaxed font-medium text-secondary"
          >
            {stats.pending > 0
              ? `You have ${stats.pending} tasks waiting. Let's make today exceptional.`
              : 'All caught up! You\'re crushing your goals — keep the momentum going.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <motion.button
              onClick={() => dispatch(openModal(null))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #6C63FF, #a855f7)',
                boxShadow: '0 0 24px rgba(108,99,255,0.5), 0 4px 16px rgba(0,0,0,0.3)'
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              />
              <Sparkles size={15} className="relative z-10" />
              <span className="relative z-10">New AI Task</span>
              <ArrowRight size={14} className="relative z-10" />
            </motion.button>

            <motion.button
              onClick={() => toast.success('AI Goal Tracking is unlocking in the next update!')}
              whileHover={{ scale: 1.03, borderColor: 'rgba(0,212,255,0.4)' }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: 'rgba(0,212,255,0.07)',
                border: '1px solid rgba(0,212,255,0.2)',
                color: 'var(--color-cyan)'
              }}
            >
              <Target size={14} /> View Goals
            </motion.button>
          </motion.div>
        </div>

        {/* Right — Stat Cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-col gap-3 min-w-[200px]"
        >
          {/* Completion Rate Card */}
          <div className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: 'var(--surface-badge)',
              border: '1px solid var(--border-primary)',
              boxShadow: '0 0 20px rgba(108,99,255,0.12) inset'
            }}>
            <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.08]">
              <img src="/ai_neural_brain.png" alt="" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold mb-2 relative z-10 text-secondary">
              <Brain size={11} style={{ color: 'var(--color-primary)' }} /> Completion Rate
            </div>
            <div className="flex items-end gap-1 mb-2 relative z-10">
              <span className="font-display font-black text-4xl text-primary">{stats.completionRate}</span>
              <span className="text-lg font-bold mb-1 text-accent">%</span>
            </div>
            <div className="progress-bar relative z-10">
              <motion.div className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${stats.completionRate}%` }}
                transition={{ delay: 0.7, duration: 1.4, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between text-[10px] mt-2 font-semibold relative z-10 text-muted-var">
              <span>{stats.completed} done</span><span>{stats.total} total</span>
            </div>
          </div>

          {/* AI Status Badge */}
          <motion.div variants={floatVariants2} animate="animate"
            className="rounded-xl px-4 py-3 flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(0,212,255,0.04) 100%)',
              border: '1px solid rgba(0,212,255,0.25)',
            }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0,212,255,0.15)' }}>
              <Zap size={13} style={{ color: 'var(--color-cyan)' }} />
            </div>
            <div>
              <div className="text-xs font-bold text-primary">AI Active</div>
              <div className="text-[10px] font-medium" style={{ color: 'var(--color-cyan)' }}>Tracking your workflow</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-cyan)', boxShadow: '0 0 8px var(--color-cyan)' }} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
