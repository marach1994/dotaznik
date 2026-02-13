'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Questionnaire } from '@/lib/types'
import { sections } from '@/lib/questions'
import { formatDate } from '@/lib/utils'

export default function AdminDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [data, setData] = useState<Questionnaire | null>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState<string | null>(null)

  useEffect(() => {
    fetchDetail()
  }, [id])

  const fetchDetail = async () => {
    try {
      // Fetch from export endpoint with json format to get structured data
      const res = await fetch(`/api/admin/export?id=${id}&format=json`)
      const exportData = await res.json()

      // Also fetch raw data for metadata
      // We'll use the export data which has all we need
      setData(exportData)
    } catch {
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleExportPDF = async () => {
    setExporting('pdf')
    try {
      const res = await fetch(`/api/admin/export?id=${id}&format=json`)
      const exportData = await res.json()

      const { default: jsPDF } = await import('jspdf')
      await import('jspdf-autotable')

      const doc = new jsPDF()

      // Title
      doc.setFontSize(18)
      doc.text('E-commerce dotaznik', 14, 22)

      doc.setFontSize(10)
      doc.setTextColor(100)
      doc.text(`Kod: ${exportData.code}`, 14, 30)
      doc.text(`Odeslano: ${exportData.submitted_at ? formatDate(exportData.submitted_at) : 'Neodeslano'}`, 14, 36)

      // Table
      const tableData = exportData.rows.map((row: { section: string; question: string; answer: string }) => [
        row.question,
        row.answer,
      ])

      let currentSection = ''
      const bodyWithSections: (string | { content: string; colSpan: number; styles: Record<string, unknown> })[][] = []

      for (const row of exportData.rows) {
        if (row.section !== currentSection) {
          currentSection = row.section
          bodyWithSections.push([{
            content: row.section,
            colSpan: 2,
            styles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold' }
          }] as never)
        }
        bodyWithSections.push([row.question, row.answer])
      }

      ;(doc as unknown as { autoTable: (opts: unknown) => void }).autoTable({
        startY: 42,
        head: [['Otazka', 'Odpoved']],
        body: bodyWithSections,
        styles: { fontSize: 9, cellPadding: 4 },
        headStyles: { fillColor: [16, 185, 129] },
        columnStyles: {
          0: { cellWidth: 90 },
          1: { cellWidth: 90 },
        },
      })

      doc.save(`dotaznik-${exportData.code}-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (err) {
      console.error('PDF export error:', err)
      alert('Chyba při generování PDF')
    } finally {
      setExporting(null)
    }
  }

  const handleExportExcel = async () => {
    setExporting('excel')
    try {
      const res = await fetch(`/api/admin/export?id=${id}&format=json`)
      const exportData = await res.json()

      const XLSX = await import('xlsx')

      const wsData = [
        ['E-commerce dotazník'],
        [`Kód: ${exportData.code}`],
        [`Odesláno: ${exportData.submitted_at ? formatDate(exportData.submitted_at) : 'Neodesláno'}`],
        [],
        ['Sekce', 'Otázka', 'Odpověď'],
        ...exportData.rows.map((row: { section: string; question: string; answer: string }) => [
          row.section,
          row.question,
          row.answer,
        ]),
      ]

      const ws = XLSX.utils.aoa_to_sheet(wsData)
      ws['!cols'] = [{ wch: 35 }, { wch: 60 }, { wch: 40 }]

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Odpovědi')
      XLSX.writeFile(wb, `dotaznik-${exportData.code}-${new Date().toISOString().split('T')[0]}.xlsx`)
    } catch (err) {
      console.error('Excel export error:', err)
      alert('Chyba při generování Excel')
    } finally {
      setExporting(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Načítání...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Dotazník nenalezen</p>
      </div>
    )
  }

  const exportData = data as unknown as {
    code: string
    created_at: string
    submitted_at: string | null
    rows: { section: string; question: string; answer: string }[]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/admin-xyz123" className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PT</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Detail dotazníku</span>
              <span className="text-sm text-gray-400 ml-2">{exportData.code}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleExportPDF}
              disabled={exporting !== null}
              className="btn-secondary text-sm px-4 py-2"
            >
              {exporting === 'pdf' ? 'Generování...' : 'Export PDF'}
            </button>
            <button
              onClick={handleExportExcel}
              disabled={exporting !== null}
              className="btn-primary text-sm px-4 py-2"
            >
              {exporting === 'excel' ? 'Generování...' : 'Export Excel'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Metadata */}
        <div className="card mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Kód</p>
              <p className="font-mono text-sm">{exportData.code}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Vytvořeno</p>
              <p className="text-sm">{formatDate(exportData.created_at)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Odesláno</p>
              <p className="text-sm">{formatDate(exportData.submitted_at)}</p>
            </div>
          </div>
        </div>

        {/* Answers */}
        {(() => {
          let currentSection = ''
          return exportData.rows.map((row, index) => {
            const showSection = row.section !== currentSection
            if (showSection) currentSection = row.section

            return (
              <div key={index}>
                {showSection && (
                  <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4 flex items-center gap-3">
                    <div className="w-2 h-6 bg-primary-500 rounded-full" />
                    {row.section}
                  </h2>
                )}
                <div className="card mb-3 !py-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">{row.question}</p>
                  <p className="text-gray-900">{row.answer}</p>
                </div>
              </div>
            )
          })
        })()}
      </main>
    </div>
  )
}
