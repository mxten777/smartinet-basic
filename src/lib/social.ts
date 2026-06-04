import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { SocialPost } from '../types'

export const getSocialPosts = async (): Promise<SocialPost[]> => {
  if (!db) return []
  const q = query(collection(db, 'social_posts'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate?.()?.toISOString() ?? '',
  })) as SocialPost[]
}

export const addSocialPost = async (data: Omit<SocialPost, 'id' | 'createdAt'>) => {
  if (!db) throw new Error('Firebase가 설정되지 않았습니다.')
  const docRef = await addDoc(collection(db, 'social_posts'), {
    ...data,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export const deleteSocialPost = async (id: string) => {
  if (!db) throw new Error('Firebase가 설정되지 않았습니다.')
  await deleteDoc(doc(db, 'social_posts', id))
}
