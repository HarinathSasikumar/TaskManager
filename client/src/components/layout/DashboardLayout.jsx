import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import TaskModal from '../tasks/TaskModal'

export default function DashboardLayout() {
  const { sidebarOpen, modalOpen } = useSelector(s => s.ui)

  return (
    <div className="min-h-screen flex relative"
      style={{ backgroundColor: 'var(--page-bg)', backgroundImage: 'none' }}>

      {/* Fixed base */}
      <div className="fixed inset-0 z-0 transition-colors duration-300" style={{ backgroundColor: 'var(--page-bg)' }} />

      {/* Subtle grid mesh overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-300"
        style={{
          backgroundImage: 'linear-gradient(var(--page-grid) 1px, transparent 1px), linear-gradient(90deg, var(--page-grid) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

      {/* Aurora blobs — very subtle */}
      <div className="aurora-bg">
        <div className="aurora-orb aurora-orb-1" style={{ opacity: 0.06 }} />
        <div className="aurora-orb aurora-orb-2" style={{ opacity: 0.05 }} />
        <div className="aurora-orb aurora-orb-3" style={{ opacity: 0.04 }} />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-20 md:hidden"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen relative z-10 transition-all duration-300 ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[68px]'}`}
        style={{ backgroundColor: 'transparent' }}
      >
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Task Modal */}
      <AnimatePresence>{modalOpen && <TaskModal />}</AnimatePresence>
    </div>
  )
}
