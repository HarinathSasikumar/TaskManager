import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Activity, Plus, CheckCircle, Clock, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function ActivityTimeline() {
  const { items } = useSelector(s => s.tasks)

  // Sort tasks by updated/created to simulate an activity feed
  const sortedTasks = [...items]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)

  const getTimelineDetails = (task) => {
    if (task.status === 'completed') {
      return {
        label: 'Completed Task',
        icon: CheckCircle,
        color: '#00E5A0',
        bg: 'rgba(0,229,160,0.1)',
        action: `Marked "${task.title}" as done`
      }
    } else if (task.status === 'in-progress') {
      return {
        label: 'Started Work',
        icon: Activity,
        color: '#00D4FF',
        bg: 'rgba(0,212,255,0.1)',
        action: `Working on "${task.title}"`
      }
    } else {
      return {
        label: 'Created Task',
        icon: Plus,
        color: '#6C63FF',
        bg: 'rgba(108,99,255,0.1)',
        action: `Added task "${task.title}"`
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="rounded-3xl p-5 md:p-6 h-full flex flex-col"
      style={{
        background: 'var(--surface-card-2)',
        border: '1px solid var(--border-card-2)',
        boxShadow: 'var(--shadow-card)'
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Activity size={18} style={{ color: '#a855f7' }} />
        <h3 className="text-primary font-semibold">Activity Timeline</h3>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-sm text-faint">
          <Clock size={36} className="mb-3 opacity-30" style={{ color: 'var(--color-primary)' }} />
          <p>No recent activity tracked yet.</p>
        </div>
      ) : (
        <div className="flex-1 space-y-5 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px]" style={{ '--tw-before-bg': 'var(--border-subtle)' }}>
          {sortedTasks.map((t, idx) => {
            const details = getTimelineDetails(t)
            return (
              <motion.div 
                key={t._id} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-4 relative z-10"
              >
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{ 
                    background: details.bg, 
                    borderColor: details.color + '20'
                  }}
                >
                  <details.icon size={15} style={{ color: details.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-primary">{details.label}</span>
                    <span className="text-[10px] flex items-center gap-1 text-muted-var">
                      <Calendar size={10} />
                      {formatDistanceToNow(new Date(t.updatedAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-xs truncate text-secondary">
                    {details.action}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
