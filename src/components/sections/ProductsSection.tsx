import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CheckCircle, Bluetooth, Wifi, Droplets, Activity, Tag } from 'lucide-react'

const products = [
  {
    id: 'watch',
    name: '스마트워치형',
    model: 'IF-WT100',
    tagline: '실종 예방의 첫 번째 선택',
    color: 'from-blue-600 to-indigo-700',
    accentColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    features: [
      { icon: Wifi, label: 'GPS + LTE Cat.M1', desc: '실외 실시간 위치 추적' },
      { icon: Activity, label: '심박수 모니터링', desc: '24시간 연속 측정' },
      { icon: Activity, label: '산소포화도 (SpO2)', desc: '건강상태 지속 확인' },
      { icon: Droplets, label: '방수 IP68', desc: '생활방수 완벽 지원' },
    ],
    specs: [
      { key: '통신', val: 'LTE Cat.M1 / GPS' },
      { key: '배터리', val: '최대 72시간' },
      { key: '방수', val: 'IP68' },
      { key: '화면', val: '1.3인치 터치' },
      { key: 'SOS', val: '긴급호출 버튼' },
    ],
    badge: 'Best Seller',
  },
  {
    id: 'tag',
    name: '스마트태그형',
    model: 'SOLU M SmartTag',
    tagline: '초경량 스텔스 보호 솔루션',
    color: 'from-green-600 to-teal-700',
    accentColor: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-700',
    features: [
      { icon: Bluetooth, label: 'Bluetooth LE', desc: '실내 위치 지원' },
      { icon: Tag, label: '초경량 설계', desc: '7g 이하 부담없는 착용' },
      { icon: Activity, label: '장시간 사용', desc: '배터리 최대 6개월' },
      { icon: Wifi, label: '실내 위치지원', desc: 'BLE Beacon 연동' },
    ],
    specs: [
      { key: '통신', val: 'Bluetooth LE 5.0' },
      { key: '배터리', val: '최대 6개월' },
      { key: '무게', val: '7g 이하' },
      { key: '크기', val: '45×45×6mm' },
      { key: '부착', val: '클립형 / 팔찌형' },
    ],
    badge: '실내 추적',
  },
]

export default function ProductsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState('watch')
  const currentProduct = products.find((p) => p.id === active)!

  return (
    <section id="products" ref={ref} className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4">
            제품 소개
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            용도에 맞는
            <span className="block text-gradient">스마트 디바이스</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            생활환경과 대상자에 최적화된 두 가지 제품으로 완벽한 안전망을 구축하세요.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex p-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`relative px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  active === p.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {active === p.id && (
                  <motion.div
                    layoutId="tab-bg"
                    className={`absolute inset-0 bg-linear-to-r ${p.color} rounded-xl`}
                  />
                )}
                <span className="relative z-10">{p.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            {/* Left: Visual */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Background glow */}
                <div className={`absolute inset-0 bg-linear-to-br ${currentProduct.color} opacity-20 rounded-full blur-3xl`} />

                {/* Device visual */}
                <div className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-linear-to-br ${currentProduct.color} opacity-10 flex items-center justify-center`}>
                  <div className={`w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-linear-to-br ${currentProduct.color} opacity-20 flex items-center justify-center`}>
                    <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-linear-to-br ${currentProduct.color} shadow-2xl flex flex-col items-center justify-center gap-2`}>
                      <span className="text-white text-2xl font-black">
                        {currentProduct.id === 'watch' ? '⌚' : '🏷️'}
                      </span>
                      <span className="text-white/90 text-xs font-bold text-center px-2">{currentProduct.model}</span>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className={`absolute -top-2 -right-2 px-3 py-1.5 rounded-full bg-linear-to-r ${currentProduct.color} text-white text-xs font-bold shadow-lg`}>
                  {currentProduct.badge}
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div>
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${currentProduct.bgColor} ${currentProduct.accentColor} border ${currentProduct.borderColor} mb-3`}>
                {currentProduct.model}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {currentProduct.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-7">{currentProduct.tagline}</p>

              {/* Feature list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                {currentProduct.features.map((f) => (
                  <div key={f.label} className={`flex items-start gap-3 p-3.5 rounded-2xl ${currentProduct.bgColor} border ${currentProduct.borderColor}`}>
                    <div className={`w-8 h-8 rounded-xl bg-linear-to-br ${currentProduct.color} flex items-center justify-center shrink-0`}>
                      <f.icon size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{f.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Specs table */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                {currentProduct.specs.map((spec, i) => (
                  <div
                    key={spec.key}
                    className={`flex items-center justify-between px-5 py-3 text-sm ${
                      i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'
                    }`}
                  >
                    <span className="text-gray-500 dark:text-gray-400 font-medium">{spec.key}</span>
                    <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-green-500" />
                      {spec.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
