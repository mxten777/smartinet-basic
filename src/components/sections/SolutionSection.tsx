import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Watch, Smartphone, Monitor, ArrowDown, CheckCircle } from 'lucide-react'

const steps = [
  {
    id: 1,
    icon: Watch,
    title: '배회감지기 착용',
    subtitle: '치매노인',
    description: 'GPS+LTE 스마트워치 또는 스마트태그를 착용하여 위치정보를 실시간 송신합니다.',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    highlights: ['GPS 위치 측위', 'LTE Cat.M1 통신', '방수 IP68', '심박 모니터링'],
  },
  {
    id: 2,
    icon: Smartphone,
    title: '보호자 앱 수신',
    subtitle: '가족·보호자',
    description: '전용 앱으로 실시간 위치 확인, 안심존 이탈 및 SOS 알림을 즉시 수신합니다.',
    color: 'from-green-500 to-teal-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    highlights: ['실시간 위치조회', '이탈 알림 Push', 'SOS 긴급호출', '이동경로 확인'],
  },
  {
    id: 3,
    icon: Monitor,
    title: '실시간 관제센터',
    subtitle: '지자체·치매안심센터',
    description: '관제 플랫폼을 통해 다수 대상자를 동시에 모니터링하고 신속히 대응합니다.',
    color: 'from-purple-500 to-indigo-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    highlights: ['다수 대상자 관제', '통계·리포트', '경찰청 연계', '24시간 운영'],
  },
]

export default function SolutionSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="solution" ref={ref} className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
            솔루션 구조
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            3단계 스마트
            <span className="block text-gradient">안전망 시스템</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            배회감지기부터 관제센터까지, 치매노인 실종 예방을 위한 통합 솔루션을 제공합니다.
          </p>
        </motion.div>

        {/* Flow diagram */}
        <div className="flex flex-col items-center gap-0 max-w-2xl mx-auto lg:max-w-full lg:flex-row lg:items-start lg:justify-center lg:gap-0">
          {steps.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center lg:flex-row lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`w-full lg:w-72 xl:w-80 rounded-3xl border ${step.border} ${step.bg} p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Step number */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-8 h-8 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                    {step.id}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {step.subtitle}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <step.icon size={26} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{step.description}</p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-2">
                  {step.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-green-500 shrink-0" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.2 + 0.3 }}
                  className="flex items-center justify-center my-3 lg:my-0 lg:mx-4 lg:mt-28"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-1">
                    <div className="w-px h-6 lg:w-8 lg:h-px bg-linear-to-b lg:bg-linear-to-r from-blue-400 to-purple-400 opacity-60" />
                    <ArrowDown size={18} className="text-blue-400 lg:-rotate-90" />
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom benefit bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { label: '실종 예방율 향상', desc: '안심존 이탈 즉시 알림으로 골든타임 확보', emoji: '🛡️' },
            { label: '보호자 불안 해소', desc: '24시간 실시간 위치확인으로 안심 돌봄 실현', emoji: '💚' },
            { label: '사회적 비용 절감', desc: '지자체 실종수색 비용 및 인력 최소화', emoji: '🏛️' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
