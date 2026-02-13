import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: 'Chybí kód dotazníku' }, { status: 400 })
    }

    const result = await pool.query(
      `UPDATE questionnaires
       SET is_completed = TRUE, submitted_at = NOW(), updated_at = NOW()
       WHERE unique_code = $1 AND is_completed = FALSE
       RETURNING id`,
      [code]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Dotazník nenalezen nebo již byl odeslán' },
        { status: 404 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error submitting questionnaire:', error)
    return NextResponse.json(
      { error: 'Chyba při odesílání dotazníku' },
      { status: 500 }
    )
  }
}
