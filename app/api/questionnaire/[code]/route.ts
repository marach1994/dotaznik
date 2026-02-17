import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params
    const result = await pool.query(
      'SELECT * FROM questionnaires WHERE unique_code = $1',
      [code]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Dotazník nenalezen' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching questionnaire:', error)
    return NextResponse.json(
      { error: 'Chyba při načítání dotazníku' },
      { status: 500 }
    )
  }
}

const UPDATABLE_FIELDS = [
  's1_q1_metrics', 's1_q2_costs', 's1_q3_pno', 's1_q4_frequency',
  's2_q1_purchase_prices', 's2_q2_margin', 's2_q3_costs_knowledge', 's2_q4_cashflow',
  's3_q1_top_products', 's3_q2_product_overview', 's3_q3_old_stock', 's3_q4_pareto',
  's4_q1_carriers', 's4_q2_invoice_check', 's4_q3_shipping_cost', 's4_q4_shipping_complaints',
  's5_q1_automation', 's5_q2_emails',
  's6_q1_repeat_customers', 's6_q2_retention', 's6_q3_customer_data',
  's7_q1_marketing_metrics',
  's8_q1_growth_barriers', 's8_q2_current_issues', 's8_q3_first_change',
  's8_q4_goods_flow', 's8_q5_accounting_software', 's8_q6_data_export',
  's8_q7_working_right', 's8_q8_money_leaks', 's8_q9_repetitive_issues',
  's8_q10_most_errors', 's8_q11_product_focus', 's8_q12_growth_brake',
  's8_q13_automation_potential', 's8_q14_future_vision',
]

const JSONB_FIELDS = [
  's1_q1_metrics', 's2_q2_margin', 's3_q1_top_products', 's3_q2_product_overview',
  's4_q1_carriers', 's5_q1_automation', 's5_q2_emails', 's6_q2_retention',
  's7_q1_marketing_metrics',
]

export async function PUT(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params
    const body = await request.json()

    // Build dynamic SET clause
    const setClauses: string[] = ['updated_at = NOW()']
    const values: unknown[] = []
    let paramIndex = 1

    for (const field of UPDATABLE_FIELDS) {
      if (field in body) {
        let value = body[field]
        if (JSONB_FIELDS.includes(field) && Array.isArray(value)) {
          value = JSON.stringify(value)
        }
        setClauses.push(`${field} = $${paramIndex}`)
        values.push(value)
        paramIndex++
      }
    }

    if (values.length === 0) {
      return NextResponse.json({ ok: true })
    }

    values.push(code)
    const query = `UPDATE questionnaires SET ${setClauses.join(', ')} WHERE unique_code = $${paramIndex} AND is_completed = FALSE`
    await pool.query(query, values)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error updating questionnaire:', error)
    return NextResponse.json(
      { error: 'Chyba při ukládání' },
      { status: 500 }
    )
  }
}
