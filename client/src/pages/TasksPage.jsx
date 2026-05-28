import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { CheckSquare } from 'lucide-react'
import { tasksAPI } from '../api/services'
import { setTasks, setLoading, setError } from '../store/taskSlice'
import TaskFilters from '../components/tasks/TaskFilters'
import TaskBoard from '../components/tasks/TaskBoard'
import SkeletonLoader from '../components/ui/SkeletonLoader'

export default function TasksPage() {
  const dispatch = useDispatch()
  const { loading, items } = useSelector(s => s.tasks)

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(setLoading(true))
      try {
        const { data } = await tasksAPI.getAll()
        dispatch(setTasks({ tasks: data.tasks, stats: data.stats }))
      } catch (err) {
        dispatch(setError(err.message))
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchTasks()
  }, [dispatch])

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-7xl mx-auto pb-20 md:pb-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-primary font-bold text-2xl flex items-center gap-2">
            <CheckSquare size={22} style={{ color: 'var(--color-primary)' }} /> Workspace Tasks
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
            Orchestrate your deliverables using the visual pipeline
          </p>
        </div>
      </div>

      {/* Filter toolbar */}
      <TaskFilters />

      {/* Kanban Board columns */}
      {loading && items.length === 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <SkeletonLoader className="h-6 w-32 rounded" />
              <div className="border border-dashed rounded-2xl p-3 space-y-3 min-h-[400px]" style={{ borderColor: 'var(--border-subtle)' }}>
                {[...Array(3)].map((_, j) => (
                  <SkeletonLoader key={j} className="h-28 rounded-2xl w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <TaskBoard />
      )}
    </motion.div>
  )
}
