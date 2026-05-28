import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Shield, BarChart3, CheckCircle2, ArrowRight, Sparkles, Star } from 'lucide-react'

const features = [
  { icon: Zap, title: 'AI-Powered Insights', desc: 'Smart analytics that learn your productivity patterns and optimize your workflow automatically.', color: '#6C63FF' },
  { icon: Shield, title: 'Bank-Grade Security', desc: 'JWT authentication, bcrypt encryption, and user-isolated data ensure your workspace is always private.', color: '#00D4FF' },
  { icon: BarChart3, title: 'Live Analytics', desc: 'Real-time charts, completion rates, and weekly productivity overviews keep you motivated.', color: '#a855f7' },
  { icon: CheckCircle2, title: 'Smart Task System', desc: 'Priority levels, deadlines, tags, drag-and-drop kanban boards with instant visual feedback.', color: '#00E5A0' },
]

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '2M+', label: 'Tasks Completed' },
  { value: '4.9★', label: 'App Rating' },
]

export default function LandingPage() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(108,99,255,${p.alpha})`
        ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Galaxy BG */}
      <div className="absolute inset-0 z-0">
        <img
          src="/landing_hero_bg.png"
          alt=""
          className="w-full h-full object-cover opacity-[0.08]"
          style={{ filter: 'blur(3px)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,6,18,0.85) 0%, rgba(6,6,18,0.96) 70%, #060612 100%)' }} />
      </div>

      {/* Aurora orbs */}
      <div className="aurora-bg">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
      </div>
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)' }}>
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">HARINOVA AI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-white/5" style={{ color: 'var(--color-muted)' }}>
            Sign In
          </Link>
          <Link to="/signup" className="px-5 py-2 text-sm rounded-xl font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg,#6C63FF,#a855f7)', boxShadow: '0 0 20px rgba(108,99,255,0.4)' }}>
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 pt-10 pb-24 max-w-7xl mx-auto gap-10">
        {/* Left Text */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 glass border"
            style={{ borderColor: 'rgba(108,99,255,0.3)', color: '#a78bfa' }}
          >
            <Sparkles size={12} />
            AI-Powered Productivity Platform
            <Sparkles size={12} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="font-display font-black text-5xl md:text-7xl leading-none mb-6 max-w-2xl"
          >
            <span className="text-white">Your Tasks.</span>
            <br />
            <span className="gradient-text">Reimagined.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="text-lg max-w-xl mb-10 leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
          >
            A cinematic-grade productivity platform that transforms how you work.
            Track tasks, visualize progress, and achieve your goals with AI-powered insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <Link
              to="/signup"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#6C63FF,#a855f7)', boxShadow: '0 0 40px rgba(108,99,255,0.4)' }}
            >
              Start Free Today
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm glass border transition-all duration-300 hover:border-primary-500/40"
              style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-text)' }}
            >
              Sign In
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            {stats.map((s, i) => (
              <div key={i} className="glass border rounded-2xl p-4 text-center card-hover" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="font-display font-black text-2xl gradient-text mb-1">{s.value}</div>
                <div className="text-xs" style={{ color: 'var(--color-muted)' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — AI Hero Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          className="flex-1 flex items-center justify-center relative"
        >
          <div className="relative w-full max-w-lg float-anim">
            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-3xl blur-[60px]" style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.4) 0%, rgba(0,212,255,0.2) 50%, transparent 100%)' }} />
            <img
              src="/ai_hero_robot.png"
              alt="AI Assistant"
              className="relative z-10 w-full rounded-3xl object-cover"
              style={{ boxShadow: '0 0 60px rgba(108,99,255,0.3), 0 0 120px rgba(108,99,255,0.1)' }}
            />
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 glass-strong border rounded-2xl px-4 py-2.5 z-20"
              style={{ borderColor: 'rgba(0,212,255,0.3)', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-bold text-white">AI Active</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 glass-strong border rounded-2xl px-4 py-2.5 z-20"
              style={{ borderColor: 'rgba(108,99,255,0.3)', boxShadow: '0 0 20px rgba(108,99,255,0.2)' }}
            >
              <div className="text-xs font-bold text-white mb-1">Tasks Completed</div>
              <div className="text-2xl font-display font-black gradient-text">94%</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="relative z-10 px-6 md:px-12 pb-24 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-3xl md:text-4xl text-center mb-3 text-white"
        >
          Everything You Need
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12 text-sm"
          style={{ color: 'var(--color-muted)' }}
        >
          Built for modern professionals who demand perfection
        </motion.p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass border rounded-2xl p-6 card-hover group"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${f.color}20`, border: `1px solid ${f.color}30` }}>
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <h3 className="font-semibold text-sm text-white mb-2">{f.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Workspace Visual Banner */}
      <div className="relative z-10 px-6 md:px-12 pb-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl glass border"
          style={{ borderColor: 'rgba(108,99,255,0.2)' }}
        >
          <img src="/productivity_workspace.png" alt="AI Workspace" className="w-full h-64 md:h-96 object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
            style={{ background: 'linear-gradient(to right, rgba(5,5,16,0.9) 0%, rgba(5,5,16,0.6) 50%, rgba(5,5,16,0.9) 100%)' }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#00D4FF' }}>Your AI Workspace</div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white mb-4">Built for <span className="gradient-text">the Future</span></h2>
            <p className="text-sm max-w-lg" style={{ color: 'var(--color-muted)' }}>
              Experience productivity reimagined with holographic dashboards, real-time AI analytics, and cinematic motion design.
            </p>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center pb-24 px-6"
      >
        <div className="glass-strong border rounded-3xl p-12 max-w-2xl mx-auto" style={{ borderColor: 'rgba(108,99,255,0.2)' }}>
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
          </div>
          <h2 className="font-display font-black text-3xl text-white mb-3">Ready to Transform Your Productivity?</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>Join thousands of professionals achieving more every day.</p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#6C63FF,#00D4FF)', boxShadow: '0 0 40px rgba(108,99,255,0.4)' }}
          >
            <Sparkles size={18} /> Launch Your Workspace
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
