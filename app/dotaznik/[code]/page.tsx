import { notFound } from 'next/navigation'
import pool from '@/lib/db'
import { Questionnaire } from '@/lib/types'
import QuestionnaireForm from '@/components/questionnaire/QuestionnaireForm'

interface Props {
  params: { code: string }
}

async function getQuestionnaire(code: string): Promise<Questionnaire | null> {
  try {
    const result = await pool.query(
      'SELECT * FROM questionnaires WHERE unique_code = $1',
      [code]
    )
    return result.rows[0] || null
  } catch {
    return null
  }
}

export default async function QuestionnairePage({ params }: Props) {
  const questionnaire = await getQuestionnaire(params.code)

  if (!questionnaire) {
    notFound()
  }

  // If already submitted, show thank you page
  if (questionnaire.is_completed) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PT</span>
            </div>
            <span className="font-semibold text-gray-900">Pavel Tlapák</span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Děkujeme!</h1>
            <p className="text-lg text-gray-600">
              Váš dotazník byl úspěšně odeslán. Děkujeme za váš čas a odpovědi.
              Brzy se vám ozveme.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PT</span>
            </div>
            <span className="font-semibold text-gray-900">Pavel Tlapák</span>
          </div>
          <div className="text-xs text-gray-400 hidden sm:block">
            Uložte si tento odkaz pro pozdější návrat
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">E-commerce dotazník</h1>
            <p className="text-gray-600">
              Vyplňte prosím následující otázky. Všechny otázky jsou nepovinné —
              vyplňte, co víte, a k ostatním se můžete vrátit později.
            </p>
          </div>

          <QuestionnaireForm code={params.code} initialData={questionnaire} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Pavel Tlapák
        </div>
      </footer>
    </div>
  )
}
