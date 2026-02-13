'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/questionnaire/create', { method: 'POST' })
      const data = await res.json()
      if (data.code) {
        router.push(`/dotaznik/${data.code}`)
      }
    } catch {
      alert('Nepodařilo se vytvořit dotazník. Zkuste to prosím znovu.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PT</span>
            </div>
            <span className="font-semibold text-gray-900">Pavel Tlapák</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            E-commerce audit
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            E-commerce dotazník
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg mx-auto">
            Pomozte nám lépe pochopit váš e-shop. Dotazník zabere přibližně 10–15 minut.
            Odpovědi můžete průběžně ukládat a vrátit se k nim později.
          </p>

          <button
            onClick={handleStart}
            disabled={loading}
            className="btn-primary text-lg px-10 py-4"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Vytváření dotazníku...
              </span>
            ) : (
              'Začít vyplňovat'
            )}
          </button>

          <p className="mt-6 text-sm text-gray-400">
            Všechny otázky jsou nepovinné. Vyplňte, co víte.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Pavel Tlapák. Všechna práva vyhrazena.
        </div>
      </footer>
    </div>
  )
}
