import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ExternalLink, ArrowRight, MessageCircle } from 'lucide-react'
import { IconInstagram, IconYoutube, IconXTwitter } from '../common/SocialIcons'
import { useInView } from '../../hooks/useInView'
import { getSocialPosts } from '../../lib/social'
import type { SocialPost } from '../../types'

// ── 플랫폼별 설정 (URL만 교체하면 됩니다) ──────────────────────────────
const PLATFORMS = [
  {
    id: 'instagram' as const,
    name: 'Instagram',
    handle: '@smartinet_official',
    cta: '팔로우하기',
    description: '치매예방 정보, 실종예방 사례, 보호자 팁을 매주 업로드합니다.',
    hashtags: ['#치매예방', '#배회감지기', '#실종예방', '#부모님안심'],
    url: 'https://instagram.com/',
    gradient: 'from-pink-500 via-red-400 to-yellow-400',
    cardBg: 'bg-linear-to-br from-pink-500/10 to-yellow-400/10',
    border: 'border-pink-500/25',
    iconBg: 'bg-linear-to-br from-pink-500 via-red-500 to-yellow-400',
    icon: <IconInstagram size={22} className="text-white" />,
  },
  {
    id: 'youtube' as const,
    name: 'YouTube',
    handle: 'Smart iNet 공식채널',
    cta: '구독하기',
    description: '배회감지기 실제 발견 사례 쇼츠, 제품 사용법, 보호자 인터뷰.',
    hashtags: ['#쇼츠', '#GPS배회감지', '#치매돌봄사례'],
    url: 'https://youtube.com/',
    gradient: 'from-red-600 to-red-500',
    cardBg: 'bg-red-500/10',
    border: 'border-red-500/25',
    iconBg: 'bg-red-600',
    icon: <IconYoutube size={22} className="text-white" />,
  },
  {
    id: 'blog' as const,
    name: 'Naver Blog',
    handle: 'blog.naver.com/smartinet',
    cta: '블로그 보기',
    description: '지원사업 신청방법, 치매안심센터 정책, 2026 복지 정보.',
    hashtags: ['#치매안심센터', '#배회감지기지원', '#복지용구지원사업'],
    url: 'https://blog.naver.com/',
    gradient: 'from-green-500 to-emerald-600',
    cardBg: 'bg-green-500/10',
    border: 'border-green-500/25',
    iconBg: 'bg-green-600',
    icon: (
      <span className="text-white font-black text-lg leading-none">N</span>
    ),
  },
  {
    id: 'kakao' as const,
    name: 'Kakao Channel',
    handle: '@스마트아이넷',
    cta: '채널 추가',
    description: '실시간 무료 상담, 도입 문의, 자료 요청을 카카오로 빠르게.',
    hashtags: ['#무료상담', '#빠른답변', '#카카오문의'],
    url: 'https://pf.kakao.com/',
    gradient: 'from-yellow-400 to-amber-400',
    cardBg: 'bg-yellow-400/10',
    border: 'border-yellow-400/25',
    iconBg: 'bg-yellow-400',
    icon: <MessageCircle size={22} className="text-yellow-900" />,
  },
  {
    id: 'x' as const,
    name: 'X (Twitter)',
    handle: '@SmartINet_KR',
    cta: '팔로우',
    description: '보건복지부, 지자체, 공공기관 관계자 대상 정책 & 홍보 소식.',
    hashtags: ['#치매정책', '#복지뉴스', '#스마트돌봄'],
    url: 'https://x.com/',
    gradient: 'from-gray-700 to-gray-900',
    cardBg: 'bg-gray-700/10',
    border: 'border-gray-500/25',
    iconBg: 'bg-gray-900 dark:bg-gray-700',
    icon: <IconXTwitter size={22} className="text-white" />,
  },
]

const PLATFORM_LABEL: Record<string, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  blog: 'Naver Blog',
  kakao: 'Kakao',
  x: 'X',
}

const PLATFORM_COLOR: Record<string, string> = {
  instagram: 'text-pink-500',
  youtube: 'text-red-500',
  blog: 'text-green-500',
  kakao: 'text-yellow-500',
  x: 'text-gray-400',
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

export default function SnsHubSection() {
  const { ref, inView } = useInView(0.1)
  const [posts, setPosts] = useState<SocialPost[]>([])

  useEffect(() => {
    getSocialPosts().then(setPosts).catch(() => {})
  }, [])

  return (
    <section id="sns" ref={ref} className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            SNS 생태계
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            다양한 채널로 만나보세요
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            인스타그램, 유튜브, 블로그, 카카오채널까지<br />
            <span className="text-white/70">콘텐츠 + 상담 전환 구조</span>로 연결합니다.
          </p>
        </motion.div>

        {/* Platform cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16"
        >
          {PLATFORMS.map((p) => (
            <motion.a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative rounded-2xl border ${p.border} ${p.cardBg} p-5 flex flex-col gap-4 cursor-pointer transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-black/20`}
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl ${p.iconBg} flex items-center justify-center shadow-lg shrink-0`}>
                {p.icon}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-bold text-white text-sm mb-0.5">{p.name}</p>
                <p className="text-xs text-gray-500 mb-2">{p.handle}</p>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{p.description}</p>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1">
                {p.hashtags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] text-gray-500 bg-white/5 rounded-md px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className={`flex items-center gap-1 text-xs font-semibold bg-linear-to-r ${p.gradient} bg-clip-text text-transparent group-hover:gap-2 transition-all`}>
                {p.cta}
                <ArrowRight size={12} className={`bg-linear-to-r ${p.gradient} bg-clip-text`} />
              </div>

              {/* External link badge */}
              <ExternalLink size={13} className="absolute top-4 right-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Dynamic posts (from Firestore) */}
        {posts.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-white font-bold text-xl mb-6"
            >
              최신 콘텐츠
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {posts.map((post) => (
                <motion.a
                  key={post.id}
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden hover:border-gray-600 transition-all"
                >
                  {post.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className={`text-xs font-semibold ${PLATFORM_COLOR[post.platform] ?? 'text-gray-400'} uppercase tracking-wide`}>
                      {PLATFORM_LABEL[post.platform] ?? post.platform}
                    </span>
                    <p className="text-white text-sm font-medium mt-1 line-clamp-2">{post.title}</p>
                    {post.createdAt && (
                      <p className="text-gray-600 text-xs mt-2">
                        {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                      </p>
                    )}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        )}

        {/* Kakao CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 rounded-2xl bg-linear-to-r from-yellow-400/15 via-yellow-300/10 to-amber-400/15 border border-yellow-400/25 p-7 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center shrink-0">
              <MessageCircle size={24} className="text-yellow-900" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">카카오채널로 빠르게 문의하세요</p>
              <p className="text-gray-400 text-sm mt-0.5">도입 상담 · 무료 자료 요청 · 지원사업 안내 — 평일 9시~18시 답변</p>
            </div>
          </div>
          <a
            href="https://pf.kakao.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle size={18} />
            카카오 채널 추가
          </a>
        </motion.div>
      </div>
    </section>
  )
}
