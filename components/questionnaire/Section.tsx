'use client'

import { ReactNode } from 'react'

interface SectionProps {
  title: string
  children: ReactNode
}

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-2 h-8 bg-primary-500 rounded-full" />
        {title}
      </h2>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  )
}
