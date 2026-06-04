import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, MapPin, Bell, Phone, MessageCircle } from 'lucide-react'

interface HeroSectionProps {
  onContactClick: () => void
}

const floatingStats = [
  { icon: Shield, label: '안심존 이탈', value: '실시간 알림', color: 'text-green-400' },
  { icon: MapPin, label: '위치 정확도', value: '±5m GPS', color: 'text-blue-400' },
  { icon: Bell, label: 'SOS 응답', value: '24시간', color: 'text-orange-400' },
]

export default function HeroSection({ onContactClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-hero">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(15,91,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(15,91,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-3xl" />

      {/* Map animation overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <MapBackground />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping-slow" />
              <span className="text-white/80 text-sm font-medium">치매안심센터 · 지자체 전국 도입 운영중</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6"
            >
              치매 어르신의
              <span className="block text-gradient mt-1">안전을 지키는</span>
              <span className="block text-white/90 mt-1">스마트 안전망</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg"
            >
              실시간 위치확인과 안전알림으로<br />
              보호자와 지역사회를 연결합니다.<br />
              <span className="text-white/70 text-base mt-2 block">
                2014년부터 검증된 치매예방 솔루션
              </span>
            </motion.p>

            {/* Key badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {['실시간 위치확인', '안심존 이탈 알림', 'SOS 긴급호출', '배회감지'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-white/80 glass border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(15,91,255,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={onContactClick}
                className="flex items-center gap-2 px-7 py-3.5 bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl shadow-xl shadow-blue-600/30 transition-all"
              >
                <Phone size={18} />
                무료 상담 신청
                <ArrowRight size={16} />
              </motion.button>

              <motion.a
                href="https://pf.kakao.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-semibold rounded-2xl shadow-lg shadow-yellow-400/20 transition-all"
              >
                <MessageCircle size={18} />
                카카오 문의
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#service')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-7 py-3.5 glass border border-white/25 text-white font-semibold rounded-2xl hover:bg-white/15 transition-all"
              >
                <Play size={16} className="fill-white" />
                서비스 소개
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-6"
            >
              {[
                { num: '2014', label: '서비스 시작', unit: '년' },
                { num: '50+', label: '도입기관', unit: '' },
                { num: '24/7', label: '모니터링', unit: '' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">
                    {stat.num}<span className="text-base">{stat.unit}</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Smartwatch Mockup + floating cards */}
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="relative"
            >
              {/* Main device mockup */}
              <div className="relative animate-float">
                <WatchMockup />
              </div>

              {/* Floating stat cards */}
              {floatingStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 + i * 0.15 }}
                  className={`absolute glass border border-white/15 rounded-2xl px-4 py-3 ${
                    i === 0 ? '-left-8 top-1/4' :
                    i === 1 ? '-right-8 top-1/2' :
                    '-left-4 bottom-1/4'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <stat.icon size={18} className={stat.color} />
                    <div>
                      <p className="text-white font-semibold text-sm leading-none">{stat.value}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  )
}

function WatchMockup() {
  return (
    <div className="relative w-56 h-72 mx-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-blue-500/30 rounded-[40px] blur-2xl animate-pulse-glow" />

      {/* Watch body */}
      <div className="relative w-56 h-56 mx-auto mt-8 rounded-[40px] bg-linear-to-br from-gray-800 to-gray-900 border border-white/20 shadow-2xl overflow-hidden">
        {/* Screen */}
        <div className="absolute inset-3 rounded-[30px] bg-linear-to-br from-blue-900 to-gray-900 overflow-hidden">
          {/* Map visualization */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute inset-0 bg-linear-to-b from-blue-950 to-blue-900" />
            {/* Grid lines */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-full border-t border-blue-700/30" style={{ top: `${i * 20}%` }} />
            ))}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute h-full border-l border-blue-700/30" style={{ left: `${i * 20}%` }} />
            ))}
          </div>

          {/* Location pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
              <div className="absolute inset-0 bg-blue-500/40 rounded-full animate-ping-slow" />
            </div>
          </div>

          {/* Status bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-[9px] font-bold">● 정상 착용중</span>
              <span className="text-white/60 text-[9px]">배터리 87%</span>
            </div>
            <p className="text-white text-[10px] font-semibold mt-0.5">서초구 방배동 · 안심존</p>
          </div>
        </div>

        {/* Watch crown */}
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-10 bg-gray-700 rounded-full border border-gray-600" />
      </div>

      {/* Watch band */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-linear-to-b from-gray-700 to-gray-600 rounded-t-2xl" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-8 bg-linear-to-t from-gray-700 to-gray-600 rounded-b-2xl" />
    </div>
  )
}

function MapBackground() {
  return (
    <div className="absolute inset-0">
      {/* Animated scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-400 to-transparent opacity-60 animate-map-scan"
        style={{ top: '50%' }}
      />
      {/* Location pins scattered */}
      {[
        { top: '20%', left: '15%' },
        { top: '45%', left: '70%' },
        { top: '65%', left: '30%' },
        { top: '30%', left: '55%' },
        { top: '75%', left: '80%' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-3 h-3"
          style={{ top: pos.top, left: pos.left }}
        >
          <div className="w-3 h-3 bg-blue-500/60 rounded-full" />
          <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping-slow" style={{ animationDelay: `${i * 0.5}s` }} />
        </div>
      ))}
    </div>
  )
}
