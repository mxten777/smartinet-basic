import { motion } from 'framer-motion'
import { Phone, ArrowRight, Shield, MapPin, Bell } from 'lucide-react'

interface CTASectionProps {
  onContactClick: () => void
}

export default function CTASection({ onContactClick }: CTASectionProps) {
  return (
    <section id="contact" className="py-24 relative overflow-hidden gradient-hero">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(15,91,255,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-600/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Icons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[Shield, MapPin, Bell].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
                className="w-12 h-12 rounded-2xl glass border border-white/20 flex items-center justify-center"
              >
                <Icon size={20} className="text-white/80" />
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            치매노인 안전망 구축,
            <span className="block text-gradient mt-2">지금 상담받아보세요</span>
          </h2>
          <p className="text-gray-300 text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
            전국 지자체, 치매안심센터, 보건소 담당자를 위한
            <br className="hidden sm:block" />
            전문 도입 컨설팅 서비스를 제공합니다.
          </p>
          <p className="text-gray-400 text-sm mb-10">
            조달청 등록 · 수의계약 가능 · 무료 시범 운영 지원
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(15,91,255,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onContactClick}
              className="flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/30 transition-all"
            >
              <Phone size={20} />
              도입 문의하기
              <ArrowRight size={18} />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="tel:15440206"
              className="flex items-center gap-2 px-8 py-4 glass border border-white/25 text-white font-bold text-lg rounded-2xl hover:bg-white/15 transition-all"
            >
              <Phone size={20} />
              1544-0206
            </motion.a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {['무료 상담', '빠른 도입', '전담 매니저', '사후관리'].map((badge) => (
              <div
                key={badge}
                className="px-4 py-2 rounded-xl glass border border-white/15 text-white/70 text-sm font-medium"
              >
                ✓ {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
