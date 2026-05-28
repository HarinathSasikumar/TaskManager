import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Circle, Activity, CheckCircle } from 'lucide-react'
import TaskCard from './TaskCard'
import { updateTask, reorderTasksLocal } from '../../store/taskSlice'
import { tasksAPI } from '../../api/services'
import toast from 'react-hot-toast'

const COLUMNS = [
  { id: 'pending', title: 'Pending', icon: Circle, color: '#FFB800' },
  { id: 'in-progress', title: 'In Progress', icon: Activity, color: '#00D4FF' },
  { id: 'completed', title: 'Completed', icon: CheckCircle, color: '#00E5A0' },
]

export default function TaskBoard() {
  const dispatch = useDispatch()
  const { items, filter } = useSelector(s => s.tasks)

  // Filter tasks based on Redux filter state
  const filteredTasks = items.filter(task => {
    const matchesSearch = filter.search
      ? task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filter.search.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(filter.search.toLowerCase()))
      : true

    const matchesPriority = filter.priority !== 'all' ? task.priority === filter.priority : true
    const matchesStatus = filter.status !== 'all' ? task.status === filter.status : true

    return matchesSearch && matchesPriority && matchesStatus
  })

  // Get tasks by column id
  const getColumnTasks = (colId) => {
    return filteredTasks
      .filter(t => t.status === colId)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  }

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return

    // If dropped in same position, do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const draggedTask = items.find(t => t._id === draggableId)
    if (!draggedTask) return

    // Create optimistic update tasks list
    const sourceColId = source.droppableId
    const destColId = destination.droppableId

    const newItems = [...items]
    const destTasks = getColumnTasks(destColId)

    // Handle status change
    let updatedTask = { ...draggedTask }
    if (sourceColId !== destColId) {
      updatedTask.status = destColId
      if (destColId === 'completed') {
        updatedTask.completedAt = new Date().toISOString()
      } else {
        updatedTask.completedAt = null
      }
    }

    // Recalculate orders
    const finalItems = items.map(item => {
      if (item._id === draggableId) {
        return updatedTask
      }
      return item
    })

    // Perform dispatch locally
    dispatch(reorderTasksLocal(finalItems))

    try {
      // Send updates to server
      const { data } = await tasksAPI.update(draggableId, { 
        status: destColId, 
        order: destination.index
      })
      dispatch(updateTask(data.task))
    } catch (err) {
      // Revert in case of failure
      toast.error('Failed to sync board reordering with cloud.')
      // Fetch latest tasks state to sync back
      const tasksRes = await tasksAPI.getAll()
      dispatch(setTasks({ tasks: tasksRes.data.tasks, stats: tasksRes.data.stats }))
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid md:grid-cols-3 gap-6 items-start w-full">
        {COLUMNS.map(col => {
          const colTasks = getColumnTasks(col.id)
          return (
            <div key={col.id} className="flex flex-col h-full min-h-[500px]">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-3 py-2 rounded-2xl glass border"
                style={{ borderColor: 'var(--border-subtle)', background: 'var(--surface-badge)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${col.color}20` }}>
                    <col.icon size={14} style={{ color: col.color }} />
                  </div>
                  <h3 className="font-bold text-sm text-primary">{col.title}</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-xl font-bold" 
                  style={{ background: 'var(--surface-card)', color: col.color, border: `1px solid ${col.color}30` }}>
                  {colTasks.length}
                </span>
              </div>

              {/* Column Drop Zone */}
              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 rounded-3xl p-3 md:p-4 min-h-[450px] transition-all relative overflow-hidden glass ${
                      snapshot.isDraggingOver ? 'drop-zone-active' : ''
                    }`}
                    style={{ 
                      borderColor: snapshot.isDraggingOver ? 'var(--color-primary)' : 'var(--border-subtle)',
                      background: snapshot.isDraggingOver ? 'rgba(108,99,255,0.06)' : 'var(--surface-badge)',
                      borderStyle: snapshot.isDraggingOver ? 'dashed' : 'solid',
                      borderWidth: snapshot.isDraggingOver ? 2 : 1
                    }}
                  >
                    {colTasks.length === 0 ? (
                      <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center p-6">
                        <div className="w-24 h-24 mb-5 float-anim relative">
                          <div className="absolute inset-0 blur-2xl rounded-full opacity-40 mix-blend-screen" style={{ background: col.color }} />
                          <img src="/empty_state_ai.png" alt="" className="w-full h-full object-cover rounded-full ai-visual relative z-10 border-2 shadow-xl" style={{ borderColor: `${col.color}40` }} />
                        </div>
                        <p className="text-xs font-bold" style={{ color: 'var(--color-muted)' }}>Drop tasks here</p>
                      </div>
                    ) : (
                      colTasks.map((task, index) => (
                        <TaskCard key={task._id} task={task} index={index} />
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
