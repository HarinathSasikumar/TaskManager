import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { X, Sparkles, Plus, Calendar, Tag } from 'lucide-react'
import { closeModal } from '../../store/uiSlice'
import { addTask, updateTask } from '../../store/taskSlice'
import { tasksAPI } from '../../api/services'
import toast from 'react-hot-toast'

const PRIORITIES = ['low', 'medium', 'high', 'critical']
const COLORS = ['#6C63FF', '#00D4FF', '#00E5A0', '#FFB800', '#FF4D6D', '#a855f7']

export default function TaskModal() {
  const dispatch = useDispatch()
  const { editingTask } = useSelector(s => s.ui)

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    deadline: '',
    tags: [],
    color: '#6C63FF'
  })
  
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        status: editingTask.status || 'pending',
        priority: editingTask.priority || 'medium',
        deadline: editingTask.deadline ? editingTask.deadline.split('T')[0] : '',
        tags: editingTask.tags || [],
        color: editingTask.color || '#6C63FF'
      })
    }
  }, [editingTask])

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const cleanTag = tagInput.trim().toLowerCase()
      if (cleanTag && !form.tags.includes(cleanTag)) {
        setForm(f => ({ ...f, tags: [...f.tags, cleanTag] }))
        setTagInput('')
      }
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tagToRemove) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Task title is required.')
      return
    }

    setLoading(true)
    try {
      if (editingTask) {
        const { data } = await tasksAPI.update(editingTask._id, form)
        dispatch(updateTask(data.task))
        toast.success('Task updated!')
      } else {
        const { data } = await tasksAPI.create(form)
        dispatch(addTask(data.task))
        toast.success('Task created! 🚀')
      }
      handleClose()
    } catch (err) {
      toast.error('Failed to save task.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative z-10 w-full max-w-lg glass-strong border rounded-3xl p-6 md:p-8"
        style={{ borderColor: 'var(--border-primary)', background: 'var(--surface-card)' }}
      >
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 md:right-6 md:top-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-var hover:text-primary transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{ background: `linear-gradient(135deg, ${form.color}, var(--color-cyan))` }}>
            <Sparkles size={16} />
          </div>
          <h3 className="font-display font-bold text-xl text-primary">
            {editingTask ? 'Edit Intelligent Task' : 'Compose Intelligent Task'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-[11px] font-semibold mb-1.5 block text-muted-var uppercase tracking-wider">Task Title</label>
            <input 
              type="text" 
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Deploy AI analytical engine core..."
              className="input-nebula px-4 py-3 text-sm rounded-xl font-medium"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-semibold mb-1.5 block text-muted-var uppercase tracking-wider">Description</label>
            <textarea 
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Detailed guidelines, goals or execution items..."
              rows={3}
              className="input-nebula px-4 py-3 text-sm rounded-xl resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="text-[11px] font-semibold mb-1.5 block text-muted-var uppercase tracking-wider">Status</label>
              <select 
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input-nebula px-4 py-2.5 text-xs rounded-xl cursor-pointer"
                style={{ background: 'var(--surface-input)' }}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="text-[11px] font-semibold mb-1.5 block text-muted-var uppercase tracking-wider">Priority</label>
              <select 
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="input-nebula px-4 py-2.5 text-xs rounded-xl cursor-pointer capitalize"
                style={{ background: 'var(--surface-input)' }}
              >
                {PRIORITIES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Deadline */}
            <div>
              <label className="text-[11px] font-semibold mb-1.5 block text-muted-var uppercase tracking-wider">Deadline</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
                <input 
                  type="date" 
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  className="input-nebula pl-10 pr-4 py-2.5 text-xs rounded-xl cursor-pointer text-secondary"
                  style={{ background: 'var(--surface-input)' }}
                />
              </div>
            </div>

            {/* Accent Theme Color */}
            <div>
              <label className="text-[11px] font-semibold mb-1.5 block text-muted-var uppercase tracking-wider">Visual Anchor</label>
              <div className="flex items-center gap-2 h-[42px]">
                {COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, color: c }))}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      form.color === c ? 'scale-125 border-white' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-[11px] font-semibold mb-1.5 block text-muted-var uppercase tracking-wider">Tags</label>
            <div className="relative mb-2">
              <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
              <input 
                type="text" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type tag name and hit Enter..."
                className="input-nebula pl-10 pr-4 py-2.5 text-xs rounded-xl"
                style={{ background: 'var(--surface-input)' }}
              />
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                {form.tags.map(tag => (
                  <span 
                    key={tag} 
                    onClick={() => handleRemoveTag(tag)}
                    className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-secondary border cursor-pointer hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-colors"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    {tag} <X size={8} />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white text-xs flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:scale-100"
            style={{ 
              background: `linear-gradient(135deg, ${form.color}, #a855f7)`,
              boxShadow: `0 0 20px ${form.color}30` 
            }}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>{editingTask ? 'Save Optimization' : 'Instantiate Task'}</>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
