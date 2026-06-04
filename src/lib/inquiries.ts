import { collection, addDoc, serverTimestamp, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'
import type { Inquiry } from '../types'

export const submitInquiry = async (data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
  if (!db) throw new Error('Firebase가 설정되지 않았습니다. .env.local 파일을 확인하세요.')
  const docRef = await addDoc(collection(db, 'inquiries'), {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export const getInquiries = async (): Promise<Inquiry[]> => {
  if (!db) throw new Error('Firebase가 설정되지 않았습니다. .env.local 파일을 확인하세요.')
  const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.()?.toISOString() ?? '',
  })) as Inquiry[]
}
