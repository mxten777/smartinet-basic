import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Building2, User, MessageSquare, CheckCircle, Loader2 } from 'lucide-react'
import { submitInquiry } from '../../lib/inquiries'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const initialForm = { name: '', phone: '', organization: '', message: '' }

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Partial<typeof initialForm>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const validate = () => {
    const e: Partial<typeof initialForm> = {}
    if (!form.name.trim()) e.name = '이름을 입력해주세요'
    if (!form.phone.trim()) e.phone = '연락처를 입력해주세요'
    else if (!/^[0-9-]{9,13}$/.test(form.phone.replace(/\s/g, ''))) e.phone = '올바른 연락처를 입력해주세요'
    if (!form.organization.trim()) e.organization = '기관명을 입력해주세요'
    if (!form.message.trim()) e.message = '문의 내용을 입력해주세요'
    else if (form.message.trim().length < 10) e.message = '최소 10자 이상 입력해주세요'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      await submitInquiry(form)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleClose = () => {
    if (status === 'loading') return
    setStatus('idle')
    setErrors({})
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-linear-to-r from-blue-600 to-indigo-700 px-7 pt-7 pb-6">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                aria-label="닫기"
              >
                <X size={16} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">도입 문의</h3>
                  <p className="text-blue-200 text-xs">빠른 시간 내 전문 상담사가 연락드립니다</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-7 py-6">
              {status === 'success' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-4 py-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">문의가 접수되었습니다!</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    담당자가 확인 후 빠른 시간 내에 연락드리겠습니다.
                    <br />
                    감사합니다.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-2 px-6 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-sm"
                  >
                    확인
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      <User size={13} className="inline mr-1.5" />
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="홍길동"
                      maxLength={50}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.name ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      <Phone size={13} className="inline mr-1.5" />
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="010-0000-0000"
                      maxLength={14}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.phone ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      <Building2 size={13} className="inline mr-1.5" />
                      기관명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(e) => handleChange('organization', e.target.value)}
                      placeholder="서초구청 복지정책과"
                      maxLength={100}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.organization ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    />
                    {errors.organization && <p className="mt-1 text-xs text-red-500">{errors.organization}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      <MessageSquare size={13} className="inline mr-1.5" />
                      문의 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="도입 관련 문의 내용을 입력해주세요. (예: 예상 대상자 수, 원하는 서비스 등)"
                      rows={4}
                      maxLength={1000}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                        errors.message ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    />
                    <div className="flex items-start justify-between mt-1">
                      {errors.message ? <p className="text-xs text-red-500">{errors.message}</p> : <span />}
                      <span className="text-xs text-gray-400">{form.message.length}/1000</span>
                    </div>
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                      문의 제출 중 오류가 발생했습니다. 다시 시도하거나 전화로 문의해주세요.
                    </div>
                  )}

                  {/* Privacy notice */}
                  <p className="text-xs text-gray-400 leading-relaxed">
                    입력하신 정보는 도입 상담 목적으로만 사용되며, 상담 완료 후 즉시 파기됩니다.
                  </p>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-600/25 disabled:opacity-70 transition-all"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        제출 중...
                      </>
                    ) : (
                      <>
                        <Phone size={16} />
                        문의 접수하기
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
