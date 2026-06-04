import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Lightbulb, GraduationCap, MapPin, Phone, Mail } from 'lucide-react'

const strengths = [
  {
    icon: Award,
    title: '특허 보유',
    description: '위치기반 배회감지 기술 관련 다수 특허 보유. 독자적 기술력으로 차별화된 서비스를 제공합니다.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Lightbulb,
    title: '연구개발 역량',
    description: '전담 R&D 팀 운영으로 AI 배회패턴 분석, 건강 모니터링 등 지속적인 기술 혁신을 추구합니다.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: GraduationCap,
    title: '산학협력',
    description: '국내 유수 대학 및 연구기관과의 산학협력으로 최신 기술을 서비스에 적용합니다.',
    color: 'from-green-500 to-teal-600',
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Company info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-5">
              회사 소개
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              ㈜스마트아이넷
              <span className="block text-gradient text-2xl sm:text-3xl lg:text-4xl mt-2">
                사람과 기술을 잇다
              </span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
              2014년 설립된 ㈜스마트아이넷은 위치기반 서비스와 스마트 돌봄 기술을 결합하여
              치매노인의 실종을 예방하는 AI 기반 안전망 플랫폼을 개발·운영하고 있습니다.
              <br /><br />
              지방자치단체, 경찰청, 치매안심센터와의 협력을 통해 전국 규모의 서비스를 제공하며,
              고령사회의 사회적 문제 해결에 앞장서고 있습니다.
            </p>

            {/* Contact card */}
            <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">회사 정보</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">서울시 서초구 효령로34길 66</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-blue-500 shrink-0" />
                  <a href="tel:15440206" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                    1544-0206
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-blue-500 shrink-0" />
                  <a href="mailto:inet@smartinet.co.kr" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                    inet@smartinet.co.kr
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {strengths.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${s.color} flex items-center justify-center shrink-0 shadow-lg`}>
                  <s.icon size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1.5">{s.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Key business areas */}
            <div className="p-6 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white">
              <h4 className="font-bold mb-4 text-lg">핵심 사업 영역</h4>
              <div className="grid grid-cols-2 gap-3">
                {['위치기반 서비스', '치매예방 솔루션', 'AI 돌봄 서비스', '스마트 관제 플랫폼'].map((area) => (
                  <div key={area} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full shrink-0" />
                    <span className="text-sm text-blue-100">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
