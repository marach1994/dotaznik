import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { sections } from '@/lib/questions'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const format = searchParams.get('format') || 'json'

    if (!id) {
      return NextResponse.json({ error: 'Chybí ID' }, { status: 400 })
    }

    const result = await pool.query(
      'SELECT * FROM questionnaires WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Nenalezeno' }, { status: 404 })
    }

    const data = result.rows[0]

    if (format === 'json') {
      // Return structured data for client-side PDF/Excel generation
      const rows: { section: string; question: string; answer: string }[] = []

      for (const section of sections) {
        for (const q of section.questions) {
          const value = data[q.field]
          let answer = '—'

          if (value !== null && value !== undefined && value !== '') {
            if (Array.isArray(value)) {
              answer = value.length > 0 ? value.join(', ') : '—'
            } else {
              answer = String(value)
            }
          }

          rows.push({
            section: section.title,
            question: q.label,
            answer,
          })
        }
      }

      return NextResponse.json({
        code: data.unique_code,
        created_at: data.created_at,
        submitted_at: data.submitted_at,
        rows,
      })
    }

    return NextResponse.json({ error: 'Nepodporovaný formát' }, { status: 400 })
  } catch (error) {
    console.error('Error exporting:', error)
    return NextResponse.json(
      { error: 'Chyba při exportu' },
      { status: 500 }
    )
  }
}
