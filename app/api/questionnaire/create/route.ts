import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { generateUniqueCode } from '@/lib/utils'

export async function POST() {
  try {
    const code = generateUniqueCode()

    await pool.query(
      'INSERT INTO questionnaires (unique_code) VALUES ($1)',
      [code]
    )

    return NextResponse.json({ code })
  } catch (error) {
    console.error('Error creating questionnaire:', error)
    return NextResponse.json(
      { error: 'Nepodařilo se vytvořit dotazník' },
      { status: 500 }
    )
  }
}
