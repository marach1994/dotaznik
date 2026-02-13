'use client'

import { useState, useEffect } from 'react'
import { QuestionnaireListItem } from '@/lib/types'
import { formatDate } from '@/lib/utils'

type Filter = 'all' | 'completed' | 'in_progress'

export default function AdminPage() {
  const [items, setItems] = useState<QuestionnaireListItem[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [filter])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/list?filter=${filter}`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PT</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Admin</span>
              <span className="text-sm text-gray-400 ml-2">Dotazníky</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Seznam dotazníků</h1>
          <div className="flex gap-2">
            {(['all', 'completed', 'in_progress'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  filter === f
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {f === 'all' ? 'Všechny' : f === 'completed' ? 'Dokončené' : 'Rozpracované'}
              </button>
            ))}
          </div>
        </div>

        <div className="card overflow-hidden p-0">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Načítání...</div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center text-gray-400">Žádné dotazníky</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Kód</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Vytvořeno</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Odesláno</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Akce</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                          {item.unique_code}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(item.submitted_at)}
                      </td>
                      <td className="px-6 py-4">
                        {item.is_completed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                            Dokončeno
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Rozpracováno
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/admin-xyz123/${item.id}`}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Detail
                          </a>
                          <a
                            href={`/dotaznik/${item.unique_code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-gray-600"
                          >
                            Odkaz
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
