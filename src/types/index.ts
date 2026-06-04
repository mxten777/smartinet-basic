export interface Inquiry {
  id?: string
  name: string
  phone: string
  organization: string
  message: string
  createdAt?: Date | string
  status?: 'pending' | 'replied' | 'closed'
}

export interface SocialPost {
  id?: string
  platform: 'instagram' | 'youtube' | 'blog' | 'kakao' | 'x'
  title: string
  imageUrl?: string
  postUrl: string
  createdAt?: string
}

export interface NavItem {
  label: string
  href: string
}

export interface Feature {
  icon: string
  title: string
  description: string
  color: string
}

export interface Product {
  id: string
  name: string
  model: string
  image?: string
  features: string[]
  badge?: string
}

export interface Partner {
  name: string
  logo?: string
  category: string
}

export interface CaseItem {
  year: string
  title: string
  description: string
  type: 'government' | 'police' | 'care' | 'partner'
}

export interface Stat {
  value: string
  unit: string
  label: string
  description: string
  color: string
}
