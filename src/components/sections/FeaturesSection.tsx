import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { MapPin, Route, Shield, Siren, WatchIcon, HeartPulse } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: '실시간 위치 확인',
    description: 'GPS 기반의 정밀 위치 조회로 어르신의 현재 위치를 실시간으로 파악합니다. 오차범위 ±5m의 높은 정확도를 제공합니다.',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    badge: 'GPS',
  },
  {
    icon: Route,
    title: '이동경로 확인',
    description: '최근 이동 동선을 시각적으로 제공합니다. 주요 방문 장소 및 이상 패턴을 분석하여 이상행동을 감지합니다.',
    color: 'from-indigo-500 to-indigo-700',
    bg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    badge: '경로추적',
  },
  {
    icon: Shield,
    title: '안심존 관리',
    description: '보호자가 설정한 안전 구역(안심존)을 벗어나면 즉시 알림을 발송합니다. 다중 안심존 설정 및 시간대별 관리가 가능합니다.',
    color: 'from-green-500 to-teal-600',
    bg: 'bg-green-500/10 dark:bg-green-500/20',
    textColor: 'text-green-600 dark:text-green-400',
    badge: '안심존',
  },
  {
    icon: Siren,
    title: 'SOS 긴급호출',
    description: '어르신이 버튼을 누르거나 긴급상황이 감지되면 보호자 및 관제센터에 즉시 SOS 알림을 발송합니다.',
    color: 'from-red-500 to-orange-600',
    bg: 'bg-red-500/10 dark:bg-red-500/20',
    textColor: 'text-red-600 dark:text-red-400',
    badge: '긴급',
  },
  {
    icon: WatchIcon,
    title: '착용감지',
    description: '스마트워치 미착용 상태를 실시간으로 감지하여 보호자에게 알립니다. 착용 유도로 지속적인 안전 모니터링을 보장합니다.',
    color: 'from-purple-500 to-violet-700',
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    badge: '착용감지',
  },
  {
    icon: HeartPulse,
    title: '건강 모니터링',
    description: '심박수 및 산소포화도(SpO2)를 지속 모니터링합니다. 이상 수치 감지 시 즉시 경고 알림으로 건강 위기를 예방합니다.',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-500/10 dark:bg-pink-500/20',
    textColor: 'text-pink-600 dark:text-pink-400',
    badge: '헬스케어',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" ref={ref} className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
            핵심 기능
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            치매 어르신 보호를 위한
            <span className="block text-gradient">6가지 스마트 기능</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            실시간 위치부터 건강 모니터링까지, 어르신의 안전을 360도로 지켜드립니다.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative p-7 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-linear-to-br ${feature.color} transition-opacity duration-300`} />

              {/* Badge */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${feature.bg} ${feature.textColor}`}>
                  {feature.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>

              {/* Bottom decorative line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
