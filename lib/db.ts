import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('sslmode=require') || process.env.DATABASE_URL?.includes('neon.tech') || process.env.DATABASE_URL?.includes('vercel')
    ? { rejectUnauthorized: false }
    : undefined,
})

export default pool

export const initSchema = `
CREATE TABLE IF NOT EXISTS questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unique_code VARCHAR(12) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  submitted_at TIMESTAMP NULL,
  is_completed BOOLEAN DEFAULT FALSE,

  -- Section 1: Řízení & přehled
  s1_q1_metrics JSONB,
  s1_q2_costs TEXT,
  s1_q3_pno TEXT,
  s1_q4_frequency TEXT,

  -- Section 2: Finance & marže
  s2_q1_purchase_prices TEXT,
  s2_q2_margin JSONB,
  s2_q3_costs_knowledge TEXT,
  s2_q4_cashflow TEXT,

  -- Section 3: Produkty & sklad
  s3_q1_top_products JSONB,
  s3_q2_product_overview JSONB,
  s3_q3_old_stock TEXT,
  s3_q4_pareto TEXT,

  -- Section 4: Doprava & logistika
  s4_q1_carriers JSONB,
  s4_q2_invoice_check TEXT,
  s4_q3_shipping_cost TEXT,
  s4_q4_shipping_complaints TEXT,

  -- Section 5: Flow & automatizace
  s5_q1_automation JSONB,
  s5_q2_emails JSONB,

  -- Section 6: Zákazník & retence
  s6_q1_repeat_customers TEXT,
  s6_q2_retention JSONB,
  s6_q3_customer_data TEXT,

  -- Section 7: Marketing
  s7_q1_marketing_metrics JSONB,

  -- Section 8: Otevřené otázky
  s8_q1_growth_barriers TEXT,
  s8_q2_current_issues TEXT,
  s8_q3_first_change TEXT,
  s8_q4_goods_flow TEXT,
  s8_q5_accounting_software TEXT,
  s8_q6_data_export TEXT,
  s8_q7_working_right TEXT,
  s8_q8_money_leaks TEXT,
  s8_q9_repetitive_issues TEXT,
  s8_q10_most_errors TEXT,
  s8_q11_product_focus TEXT,
  s8_q12_growth_brake TEXT,
  s8_q13_automation_potential TEXT,
  s8_q14_future_vision TEXT
);

CREATE INDEX IF NOT EXISTS idx_unique_code ON questionnaires(unique_code);
CREATE INDEX IF NOT EXISTS idx_created_at ON questionnaires(created_at DESC);
`
