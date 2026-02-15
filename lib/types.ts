export interface Questionnaire {
  id: string
  unique_code: string
  created_at: string
  updated_at: string
  submitted_at: string | null
  is_completed: boolean

  // Section 1: Řízení & přehled
  s1_q1_metrics: string[] | null
  s1_q2_costs: string | null
  s1_q3_pno: string | null
  s1_q4_frequency: string | null

  // Section 2: Finance & marže
  s2_q1_purchase_prices: string | null
  s2_q2_margin: string[] | null
  s2_q3_costs_knowledge: string | null
  s2_q4_cashflow: string | null

  // Section 3: Produkty & sklad
  s3_q1_top_products: string[] | null
  s3_q2_product_overview: string[] | null
  s3_q3_old_stock: string | null
  s3_q4_pareto: string | null

  // Section 4: Doprava & logistika
  s4_q1_carriers: string[] | null
  s4_q2_invoice_check: string | null
  s4_q3_shipping_cost: string | null
  s4_q4_shipping_complaints: string | null

  // Section 5: Flow & automatizace
  s5_q1_automation: string[] | null
  s5_q2_emails: string[] | null

  // Section 6: Zákazník & retence
  s6_q1_repeat_customers: string | null
  s6_q2_retention: string[] | null
  s6_q3_customer_data: string | null

  // Section 7: Marketing
  s7_q1_marketing_metrics: string[] | null

  // Section 8: Otevřené otázky
  s8_q1_growth_barriers: string | null
  s8_q2_current_issues: string | null
  s8_q3_first_change: string | null
  s8_q4_goods_flow: string | null
  s8_q5_accounting_software: string | null
  s8_q6_data_export: string | null
  s8_q7_working_right: string | null
  s8_q8_money_leaks: string | null
  s8_q9_repetitive_issues: string | null
  s8_q10_most_errors: string | null
  s8_q11_product_focus: string | null
  s8_q12_growth_brake: string | null
  s8_q13_automation_potential: string | null
  s8_q14_future_vision: string | null
}

export type QuestionnaireUpdate = Partial<Omit<Questionnaire, 'id' | 'unique_code' | 'created_at'>>

export interface QuestionnaireListItem {
  id: string
  unique_code: string
  created_at: string
  updated_at: string
  submitted_at: string | null
  is_completed: boolean
}

export interface QuestionConfig {
  id: string
  field: keyof Questionnaire
  label: string
  type: 'radio' | 'checkbox' | 'text' | 'textarea'
  options?: string[]
  placeholder?: string
}

export interface SectionConfig {
  id: string
  title: string
  questions: QuestionConfig[]
}
