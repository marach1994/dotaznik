import pg from 'pg'
import { readFileSync } from 'fs'
import { config } from 'dotenv'

config({ path: '.env.local' })

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

const schema = `
CREATE TABLE IF NOT EXISTS questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unique_code VARCHAR(12) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  submitted_at TIMESTAMP NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  s1_q1_metrics JSONB,
  s1_q2_costs TEXT,
  s1_q3_pno TEXT,
  s1_q4_frequency TEXT,
  s2_q1_purchase_prices TEXT,
  s2_q2_margin JSONB,
  s2_q3_costs_knowledge TEXT,
  s2_q4_cashflow TEXT,
  s3_q1_top_products JSONB,
  s3_q2_product_overview JSONB,
  s3_q3_old_stock TEXT,
  s3_q4_pareto TEXT,
  s4_q1_carriers JSONB,
  s4_q2_invoice_check TEXT,
  s4_q3_shipping_cost TEXT,
  s4_q4_shipping_complaints TEXT,
  s5_q1_automation JSONB,
  s5_q2_emails JSONB,
  s6_q1_repeat_customers TEXT,
  s6_q2_retention JSONB,
  s6_q3_customer_data TEXT,
  s7_q1_marketing_metrics JSONB,
  s8_q1_growth_barriers TEXT,
  s8_q2_current_issues TEXT,
  s8_q3_first_change TEXT,
  s8_q4_goods_flow TEXT,
  s8_q5_accounting_software TEXT,
  s8_q6_data_export TEXT
);

CREATE INDEX IF NOT EXISTS idx_unique_code ON questionnaires(unique_code);
CREATE INDEX IF NOT EXISTS idx_created_at ON questionnaires(created_at DESC);
`

async function main() {
  console.log('Connecting to database...')
  try {
    await pool.query(schema)
    console.log('Database schema created successfully!')
  } catch (error) {
    console.error('Error creating schema:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

main()
