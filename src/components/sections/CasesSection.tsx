import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Building2, Shield, HeartPulse } from 'lucide-react'

const cases = [
  {
    period: '2014~2016',
    title: '서비스 런칭 및 초기 보급',
    icon: Calendar,
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    events: [
      { year: '2014', desc: '㈜스마트아이넷 설립 및 배회감지기 서비스 개시' },
      { year: '2015', desc: '서울시 노원구 치매안심 시범사업 도입' },
      { year: '2016', desc: '보건복지부 치매관리사업 참여기관 선정' },
    ],
  },
  {
    period: '2017~2019',
    title: '지자체 확산 및 협력체계 구축',
    icon: Building2,
    color: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
    events: [
      { year: '2017', desc: '전국 10개 지자체 치매안심센터 공급 계약' },
      { year: '2018', desc: '경찰청 실종수색 데이터 연계 시스템 구축' },
      { year: '2019', desc: '국민건강보험공단 복지용구 급여품목 등록' },
    ],
  },
  {
    period: '2020~2022',
    title: '기술고도화 및 파트너십 강화',
    icon: Shield,
    color: 'from-green-500 to-teal-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-700',
    events: [
      { year: '2020', desc: 'SK텔레콤 LTE Cat.M1 망 연동 차세대 기기 출시' },
      { year: '2021', desc: 'SOLUM 스마트태그 협력개발 및 공동 사업 시작' },
      { year: '2022', desc: '조달청 등록 및 나라장터 공급 개시, 50개 지자체 돌파' },
    ],
  },
  {
    period: '2023~현재',
    title: 'AI 기반 스마트케어 진화',
    icon: HeartPulse,
    color: 'from-orange-500 to-red-600',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-700',
    events: [
      { year: '2023', desc: 'AI 배회패턴 분석 엔진 탑재 2세대 플랫폼 출시' },
      { year: '2024', desc: '건강 모니터링(심박·산소포화도) 기능 통합 서비스 확장' },
      { year: '2025~', desc: '전국 치매안심센터 256개소 전면 연계 추진 중' },
    ],
  },
]

export default function CasesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="cases" ref={ref} className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">
            추진사례
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            2014년부터 쌓아온
            <span className="block text-gradient">실적과 신뢰</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            지자체, 경찰청, 치매안심센터와 함께 10년 이상 치매 어르신의 안전을 지켜왔습니다.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.period}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`rounded-3xl border ${c.borderColor} ${c.bg} p-7`}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${c.color} flex items-center justify-center shrink-0 shadow-lg`}>
                  <c.icon size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{c.period}</p>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug">{c.title}</h3>
                </div>
              </div>

              {/* Events */}
              <div className="space-y-4">
                {c.events.map((event, j) => (
                  <div key={j} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full bg-linear-to-br ${c.color} mt-1.5 shrink-0`} />
                      {j < c.events.length - 1 && <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1.5" />}
                    </div>
                    <div className="pb-3">
                      <span className="text-xs font-bold text-gray-400 mr-2">{event.year}</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{event.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
