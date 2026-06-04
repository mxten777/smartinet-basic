import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Users, TrendingUp, AlertTriangle, HeartHandshake } from 'lucide-react'
import type { Stat } from '../../types'

const stats: Stat[] = [
  {
    value: '900',
    unit: '만명+',
    label: '고령화 사회 진입',
    description: '2025년 65세 이상 인구 900만 명 돌파, 초고령사회 목전',
    color: 'from-blue-500 to-blue-700',
  },
  {
    value: '100',
    unit: '만명',
    label: '치매 환자 급증',
    description: '국내 치매 환자 100만 명 시대, 매년 10만 명 이상 증가 추세',
    color: 'from-purple-500 to-purple-700',
  },
  {
    value: '1만',
    unit: '건+',
    label: '실종사고 증가',
    description: '연간 치매노인 실종 신고 1만 건 이상, 골든타임 내 발견이 관건',
    color: 'from-orange-500 to-red-600',
  },
  {
    value: '2배',
    unit: '',
    label: '복지 수요 확대',
    description: '치매 가족의 돌봄 부담 급증, 스마트 돌봄 서비스 수요 2배 성장',
    color: 'from-green-500 to-teal-600',
  },
]

const icons = [Users, TrendingUp, AlertTriangle, HeartHandshake]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function SocialProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="service" ref={ref} className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-semibold mb-4">
            사회적 문제 현황
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            왜 스마트 안전망이
            <span className="block text-gradient">필요한가?</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            대한민국은 지금 치매 위기를 맞이하고 있습니다.
            실시간 기술로 어르신의 안전을 지키는 것이 시급합니다.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${stat.color} rounded-t-3xl`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${stat.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon size={22} className="text-white" />
                </div>

                {/* Number */}
                <div className="mb-3">
                  <span className="text-4xl font-black text-gray-900 dark:text-white">{stat.value}</span>
                  <span className="text-xl font-bold text-gray-500 dark:text-gray-400 ml-1">{stat.unit}</span>
                </div>

                {/* Label */}
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{stat.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{stat.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping-slow" />
            <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">
              Smart iNet은 2014년부터 이 문제를 해결해 오고 있습니다
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
