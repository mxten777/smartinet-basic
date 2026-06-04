import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const partners = [
  { name: 'SK Telecom', category: '통신사', emoji: '📡', desc: 'LTE Cat.M1 망 제공' },
  { name: 'SOLUM', category: '하드웨어', emoji: '🔧', desc: '스마트태그 제조사' },
  { name: '국민건강보험공단', category: '공공기관', emoji: '🏥', desc: '건강보험 연계' },
  { name: '보건복지부', category: '정부부처', emoji: '🏛️', desc: '치매관리사업 협력' },
  { name: '경찰청', category: '공공기관', emoji: '👮', desc: '실종수색 협력체계' },
  { name: '치매안심센터', category: '복지시설', emoji: '💙', desc: '전국 256개소 협력' },
  { name: '지방자치단체', category: '공공기관', emoji: '🏡', desc: '복지사업 파트너' },
  { name: '복지용구사업소', category: '민간기업', emoji: '🛒', desc: '유통 파트너사' },
]

export default function PartnersSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="partners" ref={ref} className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm font-semibold mb-4">
            협력기관
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            신뢰받는
            <span className="block text-gradient">공공·민간 파트너십</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            정부기관, 통신사, 의료기관과의 긴밀한 협력으로 신뢰할 수 있는 서비스를 제공합니다.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="text-4xl">{partner.emoji}</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{partner.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{partner.desc}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                {partner.category}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Trust indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {[
            { label: '조달청 등록', icon: '✅' },
            { label: '위치기반서비스 사업자', icon: '📍' },
            { label: '벤처기업 인증', icon: '🏆' },
            { label: '특허 보유', icon: '📜' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800"
            >
              <span className="text-lg">{badge.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
