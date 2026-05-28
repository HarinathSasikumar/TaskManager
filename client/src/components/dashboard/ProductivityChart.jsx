import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Brain, Sparkles } from 'lucide-react'

export default function ProductivityChart() {
  const { weekly } = useSelector(s => s.tasks)

  const data = weekly.length > 0 ? weekly : [
    { date: 'Mon', created: 0, completed: 0 },
    { date: 'Tue', created: 0, completed: 0 },
    { date: 'Wed', created: 0, completed: 0 },
    { date: 'Thu', created: 0, completed: 0 },
    { date: 'Fri', created: 0, completed: 0 },
    { date: 'Sat', created: 0, completed: 0 },
    { date: 'Sun', created: 0, completed: 0 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-strong border rounded-xl p-3" style={{ background: 'var(--surface-badge)', borderColor: 'var(--border-primary)' }}>
          <p className="text-primary font-semibold text-xs mb-2">{label}</p>
          {payload.map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-xs mb-1 last:mb-0">
              <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              <span className="text-muted-var">{p.name}:</span>
              <span className="text-primary font-medium">{p.value}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="rounded-3xl p-5 md:p-6 h-full flex flex-col relative overflow-hidden"
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)'
      }}
    >
      {/* Neural brain watermark background */}
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-[0.04]">
        <img src="/ai_neural_brain.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-primary font-semibold flex items-center gap-2">
            <Activity size={18} style={{ color: 'var(--color-cyan)' }} /> Weekly Overview
          </h3>
          <p className="text-xs mt-1 text-muted-var">AI-tracked task creation vs completion</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-primary)' }} />
            <span className="text-muted-var">Created</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-cyan)' }} />
            <span className="text-muted-var">Completed</span>
          </div>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-4 border relative z-10"
        style={{ background: 'var(--surface-badge)', borderColor: 'var(--border-primary)' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'var(--border-primary)' }}>
          <Brain size={14} style={{ color: 'var(--color-primary)' }} />
        </div>
        <p className="text-xs text-muted-var">
          <span className="text-primary font-semibold">AI Insight: </span>
          {weekly.length > 0
            ? 'Your productivity peaks mid-week. Schedule critical tasks on Wednesday.'
            : 'Start adding tasks to unlock personalized AI productivity insights.'}
        </p>
        <Sparkles size={12} className="ml-auto shrink-0" style={{ color: 'var(--color-primary)' }} />
      </div>

      <div className="flex-1 min-h-[220px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-divider)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area type="monotone" dataKey="created" name="Created" stroke="#6C63FF" strokeWidth={3} fillOpacity={1} fill="url(#colorCreated)" />
            <Area type="monotone" dataKey="completed" name="Completed" stroke="#00D4FF" strokeWidth={3} fillOpacity={1} fill="url(#colorCompleted)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
