import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 12)

export function generateUniqueCode(): string {
  return nanoid()
}

export function formatDate(date: string | null): string {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function countAnswered(data: Record<string, unknown>): { answered: number; total: number } {
  const questionFields = [
    's1_q1_metrics', 's1_q2_costs', 's1_q3_pno', 's1_q4_frequency',
    's2_q1_purchase_prices', 's2_q2_margin', 's2_q3_costs_knowledge', 's2_q4_cashflow',
    's3_q1_top_products', 's3_q2_product_overview', 's3_q3_old_stock', 's3_q4_pareto',
    's4_q1_carriers', 's4_q2_invoice_check', 's4_q3_shipping_cost', 's4_q4_shipping_complaints',
    's5_q1_automation', 's5_q2_emails',
    's6_q1_repeat_customers', 's6_q2_retention', 's6_q3_customer_data',
    's7_q1_marketing_metrics',
    's8_q1_growth_barriers', 's8_q2_current_issues', 's8_q3_first_change',
    's8_q4_goods_flow', 's8_q5_accounting_software', 's8_q6_data_export',
  ]

  const total = questionFields.length
  let answered = 0

  for (const field of questionFields) {
    const value = data[field]
    if (value === null || value === undefined || value === '') continue
    if (Array.isArray(value) && value.length === 0) continue
    answered++
  }

  return { answered, total }
}
