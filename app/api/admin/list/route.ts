import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'

    let whereClause = ''
    if (filter === 'completed') {
      whereClause = 'WHERE is_completed = TRUE'
    } else if (filter === 'in_progress') {
      whereClause = 'WHERE is_completed = FALSE'
    }

    const result = await pool.query(
      `SELECT id, unique_code, created_at, updated_at, submitted_at, is_completed
       FROM questionnaires
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT 100`
    )

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error listing questionnaires:', error)
    return NextResponse.json(
      { error: 'Chyba při načítání seznamu' },
      { status: 500 }
    )
  }
}
