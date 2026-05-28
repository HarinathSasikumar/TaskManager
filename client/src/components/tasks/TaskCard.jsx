import { Draggable } from '@hello-pangea/dnd'
import { useDispatch } from 'react-redux'
import { Calendar, Tag, AlertTriangle, Edit3, Trash2, CheckCircle2 } from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { openModal } from '../../store/uiSlice'
import { removeTask, updateTask } from '../../store/taskSlice'
import { tasksAPI } from '../../api/services'
import toast from 'react-hot-toast'

export default function TaskCard({ task, index }) {
  const dispatch = useDispatch()

  const handleEdit = () => dispatch(openModal(task))

  const handleDelete = async () => {
    try {
      await tasksAPI.remove(task._id)
      dispatch(removeTask(task._id))
      toast.success('Task deleted.')
    } catch {
      toast.error('Failed to delete task.')
    }
  }

  const handleToggleComplete = async () => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed'
    try {
      const { data } = await tasksAPI.update(task._id, { status: nextStatus })
      dispatch(updateTask(data.task))
      toast.success(nextStatus === 'completed' ? 'Task completed! 🎉' : 'Task reopened.')
    } catch {
      toast.error('Failed to update task.')
    }
  }

  const isExpired = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'completed'
  const isComplete = task.status === 'completed'

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`glass border rounded-2xl p-4 mb-3 group cursor-grab active:cursor-grabbing transition-all relative overflow-hidden ${snapshot.isDragging ? 'dragging' : 'card-hover'}`}
          style={{
            borderColor: isComplete ? 'var(--color-green)' : `${task.color || 'var(--color-primary)'}`,
            background: isComplete ? 'var(--surface-green)' : 'var(--surface-card)',
            borderLeft: `3px solid ${isComplete ? '#00E5A0' : (task.color || '#6C63FF')}`,
            ...provided.draggableProps.style,
          }}
        >
          {/* Subtle neon glow on top edge */}
          <div className="absolute top-0 left-0 right-0 h-[1px] opacity-50 transition-opacity group-hover:opacity-100"
            style={{ background: `linear-gradient(90deg, transparent, ${task.color || '#6C63FF'}, transparent)` }} />

          {/* Status floating dot */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isComplete ? 'bg-emerald-400' : task.status === 'in-progress' ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'}`} />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2 pr-4">
            <h4 className={`text-sm font-semibold text-primary break-words leading-snug ${isComplete ? 'line-through opacity-40' : ''}`}>
              {task.title}
            </h4>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-xs mb-3 line-clamp-2 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {task.description}
            </p>
          )}

          {/* Footer row */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {/* Priority badge */}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize priority-${task.priority}`}>
              {task.priority}
            </span>

            {/* Deadline */}
            {task.deadline && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${isExpired ? 'text-red-400 border-red-500/20 bg-red-500/10' : 'border-white/10 text-white/50'}`}>
                <Calendar size={9} />
                {format(new Date(task.deadline), 'MMM dd')}
                {isExpired && <AlertTriangle size={9} className="animate-pulse" />}
              </span>
            )}

            {/* Action buttons (visible on hover) */}
            <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <button onClick={handleEdit}
                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-muted-var hover:text-primary transition-colors"
                title="Edit">
                <Edit3 size={11} />
              </button>
              <button onClick={handleDelete}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-muted-var hover:text-red-500 transition-colors"
                title="Delete">
                <Trash2 size={11} />
              </button>
              <button onClick={handleToggleComplete}
                className={`p-1.5 rounded-lg transition-all hover:scale-110 ${isComplete ? 'text-emerald-500 hover:bg-emerald-500/10' : 'text-muted-var hover:text-emerald-500 hover:bg-emerald-500/10'}`}
                title="Toggle Done">
                <CheckCircle2 size={13} />
              </button>
            </div>
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-divider)' }}>
              {task.tags.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded-md transition-colors hover:bg-primary-500/10"
                  style={{ background: `${task.color || '#6C63FF'}10`, color: task.color || '#6C63FF', border: `1px solid ${task.color || '#6C63FF'}20` }}>
                  <Tag size={8} /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}
