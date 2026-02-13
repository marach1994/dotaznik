# E-COMMERCE DOTAZNÍK - ZADÁNÍ PRO CLAUDE CODE

## 🎯 PŘEHLED PROJEKTU

**Typ:** Nová webová aplikace  
**Framework:** Next.js 14+ (App Router) + React  
**Styling:** Tailwind CSS  
**Databáze:** Flexibilní - podporovat Vercel Postgres i vlastní PostgreSQL  
**Hosting:** Primárně Vercel (ale umožnit i vlastní hosting)  
**Jazyk:** TypeScript  

---

## 📋 FUNKCIONALITA

### Hlavní funkce aplikace:

1. **Dotazník na jedné stránce** - všechny sekce viditelné najednou (dlouhá scrollovací stránka)
2. **Automatické ukládání** - průběžné ukládání odpovědí při změnách
3. **Unikátní link** - po prvním uložení vygenerovat unikátní URL pro návrat
4. **Admin rozhraní** - přístup přes tajnou URL (bez přihlášení)
5. **Export dat** - možnost stáhnout vyplněné dotazníky jako PDF nebo Excel
6. **Nepovinné otázky** - klient může přeskočit otázky a vrátit se k nim později

---

## 🎨 DESIGN A BRANDOVÁNÍ

### Vizuální styl:
- **Inspirace:** https://paveltlapak.cz (moderní, čistý design)
- **Hlavní barva:** Zelená `#10B981` (emerald-500) - podle screenshotu
- **Pozadí:** Světlé, vzdušné
- **Typografie:** Čitelná, profesionální (např. Inter, default system fonts)
- **Komponenty:** Moderní UI s cards, shadows, smooth transitions
- **Responsive:** Mobile-first přístup

### Struktura stránky dotazníku:
```
┌─────────────────────────────────┐
│ HEADER                          │
│ Logo/Název | Pavel Tlapák       │
└─────────────────────────────────┘
│                                 │
│ Nadpis dotazníku                │
│ Krátký popisek                  │
│                                 │
│ ┌───────────────────────────┐   │
│ │ SEKCE 1: Řízení & přehled │   │
│ │ [Otázky...]               │   │
│ └───────────────────────────┘   │
│                                 │
│ ┌───────────────────────────┐   │
│ │ SEKCE 2: Finance & marže  │   │
│ │ [Otázky...]               │   │
│ └───────────────────────────┘   │
│                                 │
│ ... atd ...                     │
│                                 │
│ [Uložit odpovědi] [Odeslat]     │
│                                 │
│ FOOTER                          │
└─────────────────────────────────┘
```

---

## ❓ STRUKTURA DOTAZNÍKU

### SEKCE 1: Řízení & přehled (KRITICKÉ)

**Otázka 1.1:** Sledujete pravidelně:
- Typ: Multiple checkboxes
- Možnosti:
  - ☐ obrat
  - ☐ zisk
  - ☐ marži
  - ☐ cashflow

**Otázka 1.2:** Máte přehled o všech provozních nákladech na jednom místě?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Ano
  - ○ Částečně
  - ○ Ne

**Otázka 1.3:** Máte přehled o PNO celé firmy, ne jen reklamy?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Ano
  - ○ Ne

**Otázka 1.4:** Jak často vyhodnocujete ziskovost?
- Typ: Single choice (radio)
- Možnosti:
  - ○ měsíčně
  - ○ kvartálně
  - ○ nepravidelně

---

### SEKCE 2: Finance & marže

**Otázka 2.1:** Evidujete nákupní ceny u všech produktů?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Ano
  - ○ Částečně
  - ○ Ne

**Otázka 2.2:** Máte přehled o marži:
- Typ: Multiple checkboxes
- Možnosti:
  - ☐ celého e-shopu
  - ☐ po kategoriích
  - ☐ nemáme

**Otázka 2.3:** Znáte své fixní a variabilní náklady?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Ano
  - ○ Přibližně
  - ○ Ne

**Otázka 2.4:** Máte problém s cashflow kvůli zásobám?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Ano
  - ○ Spíš ano
  - ○ Ne

---

### SEKCE 3: Produkty & sklad

**Otázka 3.1:** Máte jasně definované:
- Typ: Multiple checkboxes
- Možnosti:
  - ☐ TOP produkty podle obratu
  - ☐ TOP produkty podle marže

**Otázka 3.2:** Máte přehled o produktech, které:
- Typ: Multiple checkboxes
- Možnosti:
  - ☐ dělají obrat, ale malý zisk
  - ☐ mají vysokou marži, ale malý objem

**Otázka 3.3:** Máte přehled o ležácích (produkty skladem déle než X měsíců)?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Ano
  - ○ Přibližně
  - ○ Ne

**Otázka 3.4:** Kolik % produktů dělá cca 80 % obratu?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Víme
  - ○ Odhad
  - ○ Nevíme

---

### SEKCE 4: Doprava & logistika

**Otázka 4.1:** Jaké dopravce využíváte?
- Typ: Multiple checkboxes
- Možnosti:
  - ☐ Zásilkovna
  - ☐ PPL
  - ☐ DPD
  - ☐ GLS
  - ☐ jiní

**Otázka 4.2:** Kontrolujete faktury dopravců?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Ano
  - ○ Občas
  - ○ Ne

**Otázka 4.3:** Víte, kolik vás stojí doprava na jednu objednávku?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Ano
  - ○ Přibližně
  - ○ Ne

**Otázka 4.4:** Máte problémy s reklamacemi přepravy?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Ano
  - ○ Spíš ano
  - ○ Ne

---

### SEKCE 5: Flow objednávek & automatizace

**Otázka 5.1:** Co z níže uvedeného je automatizované?
- Typ: Multiple checkboxes
- Možnosti:
  - ☐ změny stavů objednávek
  - ☐ urgence plateb
  - ☐ storno neuhrazených objednávek
  - ☐ hlídání nízkých zásob
  - ☐ nic z výše uvedeného

**Otázka 5.2:** Odesílají se automatické e-maily:
- Typ: Multiple checkboxes
- Možnosti:
  - ☐ potvrzení objednávky
  - ☐ odeslání + tracking
  - ☐ po doručení

---

### SEKCE 6: Zákazník & retence

**Otázka 6.1:** Kolik % zákazníků nakupuje opakovaně?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Víme
  - ○ Odhad
  - ○ Nevíme

**Otázka 6.2:** Používáte:
- Typ: Multiple checkboxes
- Možnosti:
  - ☐ cross-sell / up-sell
  - ☐ věrnostní program
  - ☐ nic z toho

**Otázka 6.3:** Sledujete zákaznická data (RFM, segmenty)?
- Typ: Single choice (radio)
- Možnosti:
  - ○ Ano
  - ○ Částečně
  - ○ Ne

---

### SEKCE 7: Marketing & řízení výkonu

**Otázka 7.1:** Podle čeho hodnotíte marketing?
- Typ: Multiple checkboxes
- Možnosti:
  - ☐ ROAS / PNO
  - ☐ obrat
  - ☐ zisk
  - ☐ pocit

---

### SEKCE 8: Otevřené otázky (VELMI DŮLEŽITÉ)

**Otázka 8.1:** Kde vidíte největší brzdy růstu e-shopu?
- Typ: Textarea (multi-line text)
- Placeholder: "Popište vlastními slovy..."

**Otázka 8.2:** Co vás aktuálně nejvíc trápí v provozu?
- Typ: Textarea (multi-line text)
- Placeholder: "Popište vlastními slovy..."

**Otázka 8.3:** Co byste chtěli změnit jako první?
- Typ: Textarea (multi-line text)
- Placeholder: "Popište vlastními slovy..."

**Otázka 8.4:** Popište tok zboží od naskladnění až po expedici (jak fyzický tok zboží, tak software který používáte)
- Typ: Textarea (multi-line text)
- Placeholder: "Popište celý proces..."

**Otázka 8.5:** Jaký používáte účetní software?
- Typ: Text input (single line)
- Placeholder: "např. Money S3, Pohoda, ..."

**Otázka 8.6:** Lze z adminu e-shopu exportovat data o objednávkách a produktech? Ideálně přes XML nebo CSV feedy?
- Typ: Textarea (multi-line text)
- Placeholder: "Popište možnosti exportu..."

---

## 🗄️ DATABÁZOVÉ SCHÉMA

### Tabulka: `questionnaires`

```sql
CREATE TABLE questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unique_code VARCHAR(12) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  submitted_at TIMESTAMP NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  
  -- Section 1: Řízení & přehled
  s1_q1_metrics JSONB,  -- array of selected checkboxes
  s1_q2_costs TEXT,     -- "Ano" | "Částečně" | "Ne"
  s1_q3_pno TEXT,       -- "Ano" | "Ne"
  s1_q4_frequency TEXT, -- "měsíčně" | "kvartálně" | "nepravidelně"
  
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
  s8_q6_data_export TEXT
);

CREATE INDEX idx_unique_code ON questionnaires(unique_code);
CREATE INDEX idx_created_at ON questionnaires(created_at DESC);
```

---

## 🔧 TECHNICKÁ SPECIFIKACE

### Struktura projektu:

```
/
├── app/
│   ├── page.tsx                    # Landing page (welcome screen)
│   ├── dotaznik/
│   │   └── [code]/
│   │       └── page.tsx            # Dotazník s unique URL
│   ├── admin-xyz123/               # Admin rozhraní (tajná URL)
│   │   ├── page.tsx                # Seznam dotazníků
│   │   └── [id]/
│   │       └── page.tsx            # Detail dotazníku
│   └── api/
│       ├── questionnaire/
│       │   ├── create/route.ts     # POST - vytvoří nový dotazník
│       │   ├── [code]/route.ts     # GET/PUT - načtení/update
│       │   └── submit/route.ts     # POST - finální odeslání
│       ├── admin/
│       │   ├── list/route.ts       # GET - seznam dotazníků
│       │   └── export/route.ts     # GET - export jako PDF/Excel
│       └── health/route.ts         # Health check
├── components/
│   ├── questionnaire/
│   │   ├── QuestionnaireForm.tsx   # Hlavní formulář
│   │   ├── Section.tsx             # Wrapper pro sekci
│   │   ├── QuestionCheckbox.tsx    # Checkbox otázka
│   │   ├── QuestionRadio.tsx       # Radio otázka
│   │   └── QuestionText.tsx        # Text/textarea otázka
│   ├── admin/
│   │   ├── QuestionnaireList.tsx   # Tabulka dotazníků
│   │   └── ExportButtons.tsx       # Tlačítka pro export
│   └── ui/
│       └── ...                      # Základní UI komponenty
├── lib/
│   ├── db.ts                       # Databázové připojení
│   ├── types.ts                    # TypeScript typy
│   └── utils.ts                    # Helper funkce
├── public/
│   └── logo.svg                    # Logo (pokud bude)
└── package.json
```

### Klíčové technologie a závislosti:

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "@vercel/postgres": "^0.5.0",     // Nebo pg pro vlastní DB
    "zod": "^3.22.0",                 // Validace
    "nanoid": "^5.0.0",               // Generování unique kódů
    "jspdf": "^2.5.0",                // PDF export
    "jspdf-autotable": "^3.8.0",      // Tabulky v PDF
    "xlsx": "^0.18.0"                 // Excel export
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0"
  }
}
```

### Environment variables (.env.local):

```bash
# Database - Vercel Postgres
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."

# Nebo vlastní PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/questionnaire"

# Admin
ADMIN_URL_SECRET="xyz123"  # Tajná část URL pro admin

# Optional
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

---

## 📝 FUNKCIONALITA DETAILNĚ

### 1. Landing page (`/`)

- **Obsah:**
  - Nadpis: "E-commerce dotazník"
  - Krátký popis: "Pomozte nám lépe pochopit váš e-shop"
  - Tlačítko: "Začít vyplňovat"
- **Akce:**
  - Klik na tlačítko → API call na `/api/questionnaire/create`
  - Vytvoří nový záznam v DB s unikátním kódem (12 znaků, např. `a7k9m2p5x8q1`)
  - Redirect na `/dotaznik/[code]`

### 2. Dotazník (`/dotaznik/[code]`)

- **Načtení:**
  - Fetch data z `/api/questionnaire/[code]` (GET)
  - Pokud neexistuje → 404 stránka
  - Pokud `is_completed: true` → zobrazit "děkujeme" stránku
  
- **Automatické ukládání:**
  - Debounced auto-save každých 2 sekundy po změně
  - PUT request na `/api/questionnaire/[code]`
  - Vizuální indikátor: "Uloženo ✓" / "Ukládání..."
  
- **Struktura formuláře:**
  - Všechny sekce viditelné najednou (dlouhá stránka)
  - Každá sekce v `<Section>` komponentě s nadpisem
  - Progress indikátor: "Vyplněno X z Y otázek" (nepovinné)
  
- **Tlačítka:**
  - **"Uložit odpovědi"** - manuální save (pro jistotu)
  - **"Odeslat dotazník"** - nastaví `is_completed: true` a `submitted_at`
  - Po odeslání → přesměrování na "děkujeme" stránku

### 3. Admin rozhraní (`/admin-xyz123`)

- **Seznam dotazníků:**
  - Tabulka s columns:
    - Unique kód
    - Datum vytvoření
    - Datum odeslání
    - Status (rozpracováno / dokončeno)
    - Akce (zobrazit detail, export)
  - Řazení: nejnovější nahoře
  - Filtr: všechny / dokončené / rozpracované

- **Detail dotazníku (`/admin-xyz123/[id]`):**
  - Zobrazení všech odpovědí (read-only)
  - Tlačítka pro export (PDF, Excel)
  - Link na dotazník (pro případné sdílení)

### 4. Export

- **PDF:**
  - Knihovna: jsPDF + autotable
  - Struktur: Nadpis, metadata (datum odeslání), tabulka otázek a odpovědí
  - Filename: `dotaznik-[code]-[datum].pdf`

- **Excel:**
  - Knihovna: xlsx (SheetJS)
  - Sheet: "Odpovědi"
  - Columns: Otázka | Odpověď
  - Filename: `dotaznik-[code]-[datum].xlsx`

---

## 🎯 ACCEPTANCE CRITERIA (Definice "hotovo")

### Must-have (povinné):

- ✅ Funkční landing page s generováním unique URL
- ✅ Všechny sekce dotazníku podle specifikace
- ✅ Automatické ukládání při změnách (debounced)
- ✅ Možnost vrátit se k rozpracovanému dotazníku přes URL
- ✅ Finální odeslání dotazníku (submit)
- ✅ Admin rozhraní se seznamem dotazníků
- ✅ Export do PDF
- ✅ Export do Excel
- ✅ Responsive design (mobile + desktop)
- ✅ Vizuální styl podle reference (zelená barva, moderní design)
- ✅ TypeScript bez errorů
- ✅ Funkční připojení k databázi (Vercel Postgres nebo vlastní)

### Nice-to-have (volitelné):

- ⭐ Progress bar ukazující % vyplněných otázek
- ⭐ Dark mode
- ⭐ Email notifikace při dokončení (pro admin)
- ⭐ Vyhledávání v admin rozhraní
- ⭐ Hromadný export všech dotazníků

---

## 🚀 DEPLOYMENT

### Vercel (doporučeno):

1. Propojit GitHub repo s Vercel
2. Nastavit environment variables v Vercel dashboard
3. Automatický deploy při push do `main`

**Vercel Postgres setup:**
- Storage → Create Database → Postgres
- Zkopírovat connection stringy do `.env.local`
- Spustit init SQL schéma

### Vlastní hosting:

**Požadavky:**
- Node.js 18+
- PostgreSQL 14+
- Nginx nebo jiný reverse proxy (doporučeno)

**Build:**
```bash
npm install
npm run build
npm start
```

**Database:**
- Vytvořit databázi ručně
- Spustit SQL ze schématu výše

---

## 🧪 TESTOVÁNÍ

### Edge cases a speciální scénáře:

1. **Neplatný kód v URL** → 404 stránka
2. **Již odeslaný dotazník** → zobrazit "děkujeme" stránku
3. **Konkurentní úpravy** (nepravděpodobné, ale možné) → last-write-wins
4. **Prázdný formulář při odeslání** → všechny otázky jsou nepovinné, takže OK
5. **Velmi dlouhé textové odpovědi** → limitovat textarea na 5000 znaků
6. **DB nedostupná** → zobrazit error stránku s retry tlačítkem

### Manuální test checklist:

- [ ] Vytvořit nový dotazník z landing page
- [ ] Vyplnit několik otázek
- [ ] Zavřít stránku a vrátit se přes URL → data jsou uložená
- [ ] Dopsat odpovědi a odeslat
- [ ] Zkusit znovu navštívit URL → zobrazí se "děkujeme"
- [ ] Otevřít admin → dotazník je v seznamu jako dokončený
- [ ] Exportovat jako PDF → funkční
- [ ] Exportovat jako Excel → funkční
- [ ] Otestovat na mobilu → responsive

---

## 📚 DŮLEŽITÉ POZNÁMKY

### Konvence:

- **Naming:** camelCase pro proměnné, PascalCase pro komponenty
- **Komponenty:** Funkční komponenty s hooks
- **State management:** React useState + useEffect (žádný Redux pro tento projekt)
- **Error handling:** Try-catch bloky v API routes, toast notifikace pro uživatele
- **Komentáře:** Pouze kde je to nutné, preferovat self-documenting code

### Security:

- **Admin URL:** Použít environment variable pro tajnou část
- **SQL Injection:** Používat parameterized queries (automaticky s Vercel Postgres/pg)
- **XSS:** React escapuje HTML automaticky, ale pozor na `dangerouslySetInnerHTML`
- **CSRF:** Next.js API routes jsou chráněné automaticky

### Performance:

- **Auto-save debounce:** 2000ms (2 sekundy)
- **DB indexy:** Na `unique_code` a `created_at`
- **Lazy loading:** Pokud by byl seznam dotazníků v adminu velký → pagination

---

## 🔗 REFERENCE LINKS

- **Design inspirace:** https://paveltlapak.cz
- **Next.js dokumentace:** https://nextjs.org/docs
- **Vercel Postgres:** https://vercel.com/docs/storage/vercel-postgres
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## ✅ CHECKLIST PRO CLAUDE CODE

Před začátkem kódování:
- [ ] Vytvořit Next.js projekt (`npx create-next-app@latest`)
- [ ] Nainstalovat všechny dependence
- [ ] Nastavit Tailwind CSS
- [ ] Vytvořit `.env.local` s connection stringy
- [ ] Vytvořit databázové schéma

Během vývoje:
- [ ] Implementovat databázové připojení a test
- [ ] Vytvořit API routes (create, get, update, submit, list, export)
- [ ] Implementovat UI komponenty (Section, Question types)
- [ ] Vytvořit stránky (landing, dotazník, admin)
- [ ] Stylovat podle reference
- [ ] Implementovat auto-save logiku
- [ ] Implementovat PDF export
- [ ] Implementovat Excel export
- [ ] Otestovat všechny flows

Po dokončení:
- [ ] Code review (TypeScript errors, linting)
- [ ] Otestovat všechny edge cases
- [ ] Připravit deployment instrukce
- [ ] Vytvořit README.md s dokumentací

---

**🎉 KONEC ZADÁNÍ - ready for Claude Code!**
