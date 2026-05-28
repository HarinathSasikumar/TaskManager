import { useDispatch, useSelector } from 'react-redux'
import { Search, SlidersHorizontal, Plus } from 'lucide-react'
import { setFilter } from '../../store/taskSlice'
import { openModal as openUiModal } from '../../store/uiSlice'

export default function TaskFilters() {
  const dispatch = useDispatch()
  const { filter } = useSelector(s => s.tasks)

  const handleSearchChange = (e) => {
    dispatch(setFilter({ search: e.target.value }))
  }

  const handleStatusChange = (status) => {
    dispatch(setFilter({ status }))
  }

  const handlePriorityChange = (priority) => {
    dispatch(setFilter({ priority }))
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass border rounded-3xl p-3 md:p-4 w-full relative overflow-hidden"
      style={{ borderColor: 'var(--border-card)', background: 'var(--surface-card)' }}>
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 pointer-events-none" style={{ background: 'var(--color-primary)' }} />
      
      {/* Search */}
      <div className="relative w-full md:w-80 group z-10">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary-400" 
          style={{ color: 'var(--color-muted)' }} />
        <input 
          type="text" 
          value={filter.search}
          onChange={handleSearchChange}
          placeholder="Filter tasks by title or tags..." 
          className="input-nebula pl-11 pr-4 py-2.5 text-sm rounded-2xl"
          style={{ background: 'var(--surface-input)' }}
        />
      </div>

      {/* Select Filters & Actions */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto z-10">
        <div className="flex items-center gap-2 w-full sm:w-auto bg-black/5 dark:bg-white/5 p-1 rounded-2xl border" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="hidden sm:flex items-center gap-2 pl-3 pr-1 border-r" style={{ borderColor: 'var(--border-subtle)' }}>
            <SlidersHorizontal size={14} style={{ color: 'var(--color-muted)' }} />
            <span className="text-xs font-bold" style={{ color: 'var(--color-muted)' }}>Filters</span>
          </div>
          
          <select 
            value={filter.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="input-nebula px-3 py-2 text-xs rounded-xl cursor-pointer w-full sm:w-auto font-medium"
            style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select 
            value={filter.priority}
            onChange={(e) => handlePriorityChange(e.target.value)}
            className="input-nebula px-3 py-2 text-xs rounded-xl cursor-pointer w-full sm:w-auto font-medium"
            style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <button 
          onClick={() => dispatch(openUiModal(null))}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 hover:scale-105 ml-auto shadow-lg relative overflow-hidden group"
          style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }}
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          <Plus size={16} className="relative z-10" /> 
          <span className="relative z-10">New Task</span>
        </button>
      </div>
    </div>
  )
}
