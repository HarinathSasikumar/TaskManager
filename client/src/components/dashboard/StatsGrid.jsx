import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, ListTodo, Activity } from 'lucide-react'

const statItems = [
  {
    label: 'Total Tasks', key: 'total', icon: ListTodo,
    color: 'var(--color-primary)'
  },
  {
    label: 'Completed', key: 'completed', icon: CheckCircle2,
    color: 'var(--color-green)'
  },
  {
    label: 'In Progress', key: 'inProgress', icon: Activity,
    color: 'var(--color-cyan)'
  },
  {
    label: 'Pending', key: 'pending', icon: Clock,
    color: 'var(--color-gold)'
  },
]

export default function StatsGrid() {
  const { stats } = useSelector(s => s.tasks)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}
      className="grid-cols-2 lg:grid-cols-4">
      {statItems.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.5, type: 'spring', stiffness: 280 }}
          className="relative overflow-hidden rounded-2xl cursor-default group"
          style={{
            background: 'var(--surface-card)',
            border: `1px solid var(--border-card)`,
            boxShadow: 'var(--shadow-card)',
            padding: '1.25rem',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          }}
          whileHover={{ y: -6, scale: 1.03 }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-card)'}
        >
          {/* Corner radial glow */}
          <div style={{
            position: 'absolute', top: -32, right: -32, width: 100, height: 100,
            borderRadius: '50%', background: s.color, opacity: 0.18, filter: 'blur(28px)',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
          }} className="group-hover:opacity-40" />

          {/* Animated neon bottom bar */}
          <motion.div
            style={{
              position: 'absolute', bottom: 0, left: 0, height: 2, borderRadius: 99,
              background: `linear-gradient(90deg, ${s.color}, transparent)`
            }}
            initial={{ width: '0%' }}
            animate={{ width: '70%' }}
            transition={{ delay: i * 0.1 + 0.6, duration: 1, ease: 'easeOut' }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Icon */}
            <div style={{
              width: 44, height: 44, borderRadius: 12, display: 'flex',
              alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              background: 'var(--surface-badge)',
              border: `1px solid var(--border-subtle)`,
              boxShadow: `0 0 20px rgba(108,99,255,0.1)`,
              transition: 'transform 0.3s ease'
            }} className="group-hover:scale-110">
              <s.icon size={22} style={{ color: s.color }} />
            </div>

            {/* Number */}
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: '2.6rem',
              lineHeight: 1,
              color: 'var(--text-primary)',
              marginBottom: 6,
            }}>
              {stats[s.key]}
            </div>

            {/* Label */}
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: s.color,
              textTransform: 'uppercase'
            }}>
              {s.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
