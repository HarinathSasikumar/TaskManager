import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { tasksAPI } from '../api/services'
import { setTasks, setWeekly, setLoading, setError } from '../store/taskSlice'
import HeroWelcome from '../components/dashboard/HeroWelcome'
import StatsGrid from '../components/dashboard/StatsGrid'
import ProductivityChart from '../components/dashboard/ProductivityChart'
import ActivityTimeline from '../components/dashboard/ActivityTimeline'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import { BarChart3, Clock, Sparkles } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}
const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Dashboard() {
  const dispatch = useDispatch()
  const { loading, items } = useSelector(s => s.tasks)

  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(setLoading(true))
      try {
        const [tasksRes, statsRes] = await Promise.all([
          tasksAPI.getAll({ status: 'all', limit: 5 }),
          tasksAPI.getWeekly()
        ])
        dispatch(setTasks({ tasks: tasksRes.data.tasks, stats: tasksRes.data.stats }))
        dispatch(setWeekly(statsRes.data.weekly))
      } catch (err) {
        dispatch(setError(err.message))
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchDashboardData()
  }, [dispatch])

  if (loading && items.length === 0) {
    return (
      <div className="space-y-6">
        <SkeletonLoader className="h-[260px] w-full rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonLoader key={i} className="h-32 rounded-2xl" />)}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <SkeletonLoader className="lg:col-span-2 h-[380px] rounded-3xl" />
          <SkeletonLoader className="h-[380px] rounded-3xl" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto pb-20 md:pb-8 space-y-6"
    >
      {/* Hero */}
      <motion.div variants={itemVariant}>
        <HeroWelcome />
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariant}>
        <StatsGrid />
      </motion.div>

      {/* Section divider */}
      <motion.div variants={itemVariant} className="flex items-center gap-4">
        <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(108,99,255,0.4), transparent)' }} />
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)', color: '#a78bfa' }}>
          <Sparkles size={11} /> Analytics & Activity
        </div>
        <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4))' }} />
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariant} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductivityChart />
        </div>
        <div>
          <ActivityTimeline />
        </div>
      </motion.div>

      {/* Quick info footer strip */}
      <motion.div variants={itemVariant}
        className="flex flex-wrap gap-4 rounded-2xl p-4"
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-card)'
        }}>
        {[
          { icon: BarChart3, label: 'Weekly Productivity', value: 'Tracked by AI', color: '#6C63FF' },
          { icon: Clock, label: 'Avg Task Duration', value: 'Calculated live', color: '#00D4FF' },
          { icon: Sparkles, label: 'AI Insights', value: 'Always on', color: '#a855f7' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 flex-1 min-w-[160px]">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
              <item.icon size={16} style={{ color: item.color }} />
            </div>
            <div>
              <div className="text-xs font-bold text-primary">{item.label}</div>
              <div className="text-[10px] font-semibold" style={{ color: item.color }}>{item.value}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
