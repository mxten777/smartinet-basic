import { MapPin, Phone, Mail, ExternalLink, MessageCircle } from 'lucide-react'
import { IconInstagram, IconYoutube, IconXTwitter } from '../common/SocialIcons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <div>
                <p className="font-bold text-white text-base leading-none">Smart iNet</p>
                <p className="text-xs text-blue-400 tracking-widest mt-0.5">㈜스마트아이넷</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              치매노인 및 고령자의 실종을 예방하는 위치기반 스마트 안전망 서비스를 제공합니다.
              실시간 위치확인과 안전알림으로 보호자와 지역사회를 연결합니다.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-600/30">
                <span className="text-blue-400 text-xs font-medium">위치기반서비스사업자</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-green-600/20 border border-green-600/30">
                <span className="text-green-400 text-xs font-medium">벤처기업 인증</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-2.5">
              {['서비스소개', '주요기능', '제품소개', '도입사례', '협력기관'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">연락처</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-blue-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">
                  서울시 서초구 효령로34길 66
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-blue-400 shrink-0" />
                <a href="tel:15440206" className="text-sm text-gray-400 hover:text-white transition-colors">
                  1544-0206
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-blue-400 shrink-0" />
                <a href="mailto:inet@smartinet.co.kr" className="text-sm text-gray-400 hover:text-white transition-colors">
                  inet@smartinet.co.kr
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <ExternalLink size={15} className="text-blue-400 shrink-0" />
                <a
                  href="https://www.smartinet.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  www.smartinet.co.kr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SNS Links */}
        <div className="py-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">공식 SNS 채널</p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-linear-to-br from-pink-500 via-red-500 to-yellow-400 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <IconInstagram size={16} className="text-white" />
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <IconYoutube size={16} className="text-white" />
            </a>
            <a
              href="https://blog.naver.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Naver Blog"
              className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <span className="text-white font-black text-sm">N</span>
            </a>
            <a
              href="https://pf.kakao.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kakao Channel"
              className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <MessageCircle size={16} className="text-yellow-900" />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-9 h-9 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <IconXTwitter size={16} className="text-white" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {year} ㈜스마트아이넷. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              이용약관
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              사업자정보확인
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
