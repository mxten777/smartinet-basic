import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, Store, UserCheck, ArrowRight } from 'lucide-react'

const models = [
  {
    type: 'B2G',
    icon: Building2,
    title: '지자체 지원사업',
    subtitle: '공공기관 대상',
    description: '지방자치단체 치매안심사업, 복지서비스 예산을 활용한 대규모 도입을 지원합니다. 조달청 등록 제품으로 수의계약 가능합니다.',
    color: 'from-blue-600 to-indigo-700',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    accentColor: 'text-blue-600 dark:text-blue-400',
    targets: ['지방자치단체', '보건소', '치매안심센터', '국민건강보험공단'],
    highlight: '조달청 등록',
  },
  {
    type: 'B2B',
    icon: Store,
    title: '복지용구사업소',
    subtitle: '민간기업 대상',
    description: '복지용구 공급기관을 통한 유통 파트너십으로 전국 어디서나 서비스를 제공합니다. 대리점 모집 및 파트너 지원 프로그램이 운영됩니다.',
    color: 'from-green-600 to-teal-700',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    accentColor: 'text-green-600 dark:text-green-400',
    targets: ['복지용구사업소', '요양원·요양병원', '실버케어 업체', '의료기기 유통사'],
    highlight: '파트너 모집중',
  },
  {
    type: 'B2C',
    icon: UserCheck,
    title: '보호자 직접가입',
    subtitle: '개인 고객 대상',
    description: '스마트폰 앱 하나로 간편하게 가입하고 어르신의 안전을 지킬 수 있습니다. 월정액 구독 서비스로 부담없이 시작하세요.',
    color: 'from-orange-500 to-red-600',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-800',
    accentColor: 'text-orange-600 dark:text-orange-400',
    targets: ['치매 어르신 가족', '독거노인 보호자', '원거리 가족 돌봄', '개인 보호자'],
    highlight: '앱스토어 출시',
  },
]

export default function BusinessModelSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="business" ref={ref} className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-4">
            사업 모델
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            다양한 채널로
            <span className="block text-gradient">고객을 만납니다</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            공공기관부터 개인까지, 모든 고객에게 최적화된 서비스 제공 방식을 운영합니다.
          </p>
        </motion.div>

        {/* Business model cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {models.map((model, i) => (
            <motion.div
              key={model.type}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-3xl border ${model.border} ${model.bg} p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Type badge */}
              <div className={`absolute -top-3 left-8 px-4 py-1 rounded-full bg-linear-to-r ${model.color} text-white text-sm font-black shadow-lg`}>
                {model.type}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${model.color} flex items-center justify-center mb-5 shadow-lg mt-3`}>
                <model.icon size={26} className="text-white" />
              </div>

              <div className={`text-xs font-semibold ${model.accentColor} mb-1 uppercase tracking-wider`}>
                {model.subtitle}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{model.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{model.description}</p>

              {/* Target audience */}
              <div className="space-y-2 mb-6">
                {model.targets.map((target) => (
                  <div key={target} className="flex items-center gap-2">
                    <ArrowRight size={13} className={model.accentColor} />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{target}</span>
                  </div>
                ))}
              </div>

              {/* Highlight badge */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r ${model.color} bg-opacity-10`}>
                <span className="text-white text-xs font-semibold">{model.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
