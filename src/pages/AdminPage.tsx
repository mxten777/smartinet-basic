import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LogOut, RefreshCw, MessageSquare, Clock, User, Phone, Building2,
  ChevronDown, ChevronUp, MessageCircle, Plus, Trash2, ExternalLink,
} from 'lucide-react'
import { IconInstagram, IconYoutube, IconXTwitter } from '../components/common/SocialIcons'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import type { User as FirebaseUser } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { getInquiries } from '../lib/inquiries'
import { getSocialPosts, addSocialPost, deleteSocialPost } from '../lib/social'
import type { Inquiry, SocialPost } from '../types'

type AdminTab = 'inquiries' | 'social'

const PLATFORM_OPTIONS: { value: SocialPost['platform']; label: string }[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'blog', label: 'Naver Blog' },
  { value: 'kakao', label: 'Kakao Channel' },
  { value: 'x', label: 'X (Twitter)' },
]

const PlatformIcon = ({ platform, size = 14 }: { platform: SocialPost['platform']; size?: number }) => {
  if (platform === 'instagram') return <IconInstagram size={size} />
  if (platform === 'youtube') return <IconYoutube size={size} />
  if (platform === 'kakao') return <MessageCircle size={size} />
  if (platform === 'x') return <IconXTwitter size={size} />
  return <span className="font-black text-xs leading-none">N</span>
}

const PLATFORM_COLOR: Record<string, string> = {
  instagram: 'text-pink-500 bg-pink-50 dark:bg-pink-900/20',
  youtube: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  blog: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  kakao: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
  x: 'text-gray-500 bg-gray-100 dark:bg-gray-800',
}

export default function AdminPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [authLoading, setAuthLoading] = useState(() => !!auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [tab, setTab] = useState<AdminTab>('inquiries')

  // 문의
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // SNS 포스트
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [postsLoading, setPostsLoading] = useState(false)
  const [newPost, setNewPost] = useState<Omit<SocialPost, 'id' | 'createdAt'>>({
    platform: 'instagram',
    title: '',
    postUrl: '',
    imageUrl: '',
  })
  const [addingPost, setAddingPost] = useState(false)
  const [postError, setPostError] = useState('')

  const loadInquiries = async () => {
    setDataLoading(true)
    try {
      const data = await getInquiries()
      setInquiries(data)
    } catch (e) {
      console.error('Failed to load inquiries:', e)
    } finally {
      setDataLoading(false)
    }
  }

  const loadPosts = async () => {
    setPostsLoading(true)
    try {
      const data = await getSocialPosts()
      setPosts(data)
    } catch (e) {
      console.error('Failed to load posts:', e)
    } finally {
      setPostsLoading(false)
    }
  }

  useEffect(() => {
    if (!auth) return
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return unsub
  }, [])

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadInquiries()
      loadPosts()
    }
  }, [user])

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setPostError('')
    if (!newPost.title.trim() || !newPost.postUrl.trim()) {
      setPostError('제목과 포스트 URL은 필수입니다.')
      return
    }
    setAddingPost(true)
    try {
      await addSocialPost({
        platform: newPost.platform,
        title: newPost.title.trim(),
        postUrl: newPost.postUrl.trim(),
        ...(newPost.imageUrl?.trim() ? { imageUrl: newPost.imageUrl.trim() } : {}),
      })
      setNewPost({ platform: 'instagram', title: '', postUrl: '', imageUrl: '' })
      await loadPosts()
    } catch {
      setPostError('포스트 추가에 실패했습니다.')
    } finally {
      setAddingPost(false)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('이 포스트를 삭제할까요?')) return
    try {
      await deleteSocialPost(id)
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch {
      alert('삭제에 실패했습니다.')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    try {
      if (!auth) throw new Error('Firebase not configured')
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => auth && signOut(auth)

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <RefreshCw size={28} className="animate-spin text-blue-500" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SI</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">Smart iNet</p>
              <p className="text-xs text-blue-600">관리자 로그인</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@smartinet.co.kr"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-sm disabled:opacity-60 transition-all hover:shadow-lg"
            >
              {loginLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <span className="text-white font-bold text-xs">SI</span>
          </div>
          <div>
            <span className="font-bold text-gray-900 dark:text-white text-sm">Smart iNet</span>
            <span className="ml-2 text-xs text-gray-400">관리자</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:block">{user.email}</span>
          <button
            onClick={() => { loadInquiries(); loadPosts() }}
            disabled={dataLoading || postsLoading}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="새로고침"
          >
            <RefreshCw size={16} className={(dataLoading || postsLoading) ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <LogOut size={15} />
            로그아웃
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 rounded-xl p-1 mb-8 w-fit">
          <button
            onClick={() => setTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'inquiries'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare size={15} />
            문의 관리
            {inquiries.filter((i) => i.status === 'pending').length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded-full leading-none">
                {inquiries.filter((i) => i.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab('social')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'social'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <IconInstagram size={15} />
            SNS 관리
            <span className="ml-1 text-xs text-gray-400">{posts.length}</span>
          </button>
        </div>

        {/* ── 문의 탭 ─────────────────────────────────────── */}
        {tab === 'inquiries' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">문의 내역</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  총 <span className="font-semibold text-blue-600">{inquiries.length}</span>건
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <MessageSquare size={15} className="text-blue-500" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {inquiries.filter((i) => i.status === 'pending').length}건 대기중
                </span>
              </div>
            </div>

            {dataLoading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw size={28} className="animate-spin text-blue-500" />
              </div>
            ) : inquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <MessageSquare size={40} className="mb-3 opacity-40" />
                <p>아직 문의가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inquiry, i) => {
                  const isExpanded = expandedId === inquiry.id
                  const createdAt = inquiry.createdAt
                    ? new Date(inquiry.createdAt as string).toLocaleDateString('ko-KR', {
                        year: 'numeric', month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit',
                      })
                    : '-'

                  return (
                    <motion.div
                      key={inquiry.id ?? i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : (inquiry.id ?? null))}
                        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                      >
                        <div className={`w-2 h-2 rounded-full shrink-0 ${inquiry.status === 'pending' ? 'bg-orange-400' : 'bg-green-400'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900 dark:text-white text-sm">{inquiry.name}</span>
                            <span className="text-xs text-gray-400">·</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 truncate">{inquiry.organization}</span>
                          </div>
                          <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                            <Clock size={11} />
                            {createdAt}
                          </span>
                        </div>
                        <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                          inquiry.status === 'pending'
                            ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                            : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        }`}>
                          {inquiry.status === 'pending' ? '대기중' : inquiry.status === 'replied' ? '답변완료' : '종료'}
                        </span>
                        {isExpanded ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="border-t border-gray-100 dark:border-gray-800 px-5 py-5"
                        >
                          <div className="grid sm:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2.5">
                              <User size={14} className="text-blue-500" />
                              <div>
                                <p className="text-xs text-gray-400">이름</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{inquiry.name}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <Phone size={14} className="text-blue-500" />
                              <div>
                                <p className="text-xs text-gray-400">연락처</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{inquiry.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <Building2 size={14} className="text-blue-500" />
                              <div>
                                <p className="text-xs text-gray-400">기관명</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{inquiry.organization}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                            <p className="text-xs text-gray-400 mb-1.5">문의 내용</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* ── SNS 탭 ──────────────────────────────────────── */}
        {tab === 'social' && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SNS 콘텐츠 관리</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                포스트를 추가하면 홈페이지 SNS 섹션에 자동으로 노출됩니다.
              </p>
            </div>

            {/* Add post form */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Plus size={17} className="text-blue-500" />
                새 포스트 추가
              </h2>
              <form onSubmit={handleAddPost} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">플랫폼</label>
                  <select
                    value={newPost.platform}
                    onChange={(e) => setNewPost((p) => ({ ...p, platform: e.target.value as SocialPost['platform'] }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {PLATFORM_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">제목 *</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))}
                    placeholder="포스트 제목"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">포스트 URL *</label>
                  <input
                    type="url"
                    value={newPost.postUrl}
                    onChange={(e) => setNewPost((p) => ({ ...p, postUrl: e.target.value }))}
                    placeholder="https://"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">이미지 URL (선택)</label>
                  <input
                    type="url"
                    value={newPost.imageUrl ?? ''}
                    onChange={(e) => setNewPost((p) => ({ ...p, imageUrl: e.target.value }))}
                    placeholder="https://... (썸네일 이미지)"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {postError && (
                  <p className="sm:col-span-2 text-red-500 text-sm">{postError}</p>
                )}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={addingPost}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm disabled:opacity-60 transition-colors"
                  >
                    <Plus size={16} />
                    {addingPost ? '추가 중...' : '포스트 추가'}
                  </button>
                </div>
              </form>
            </div>

            {/* Posts list */}
            {postsLoading ? (
              <div className="flex items-center justify-center py-16">
                <RefreshCw size={28} className="animate-spin text-blue-500" />
              </div>
            ) : posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <IconInstagram size={40} className="mb-3 opacity-40" />
                <p>등록된 SNS 포스트가 없습니다.</p>
                <p className="text-sm mt-1">위 폼에서 첫 포스트를 추가해보세요.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {posts.map((post, i) => (
                  <motion.div
                    key={post.id ?? i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4"
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${PLATFORM_COLOR[post.platform]}`}>
                      <PlatformIcon platform={post.platform} size={15} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{post.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {PLATFORM_OPTIONS.find((o) => o.value === post.platform)?.label}
                        {post.createdAt && ` · ${new Date(post.createdAt).toLocaleDateString('ko-KR')}`}
                      </p>
                    </div>
                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shrink-0"
                      title="포스트 열기"
                    >
                      <ExternalLink size={15} />
                    </a>
                    <button
                      onClick={() => post.id && handleDeletePost(post.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0"
                      title="삭제"
                    >
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
