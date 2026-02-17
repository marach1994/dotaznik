'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Questionnaire } from '@/lib/types'
import { sections } from '@/lib/questions'
import { countAnswered } from '@/lib/utils'
import Section from './Section'
import QuestionRadio from './QuestionRadio'
import QuestionCheckbox from './QuestionCheckbox'
import QuestionText from './QuestionText'

interface QuestionnaireFormProps {
  code: string
  initialData: Questionnaire
}

type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error'

export default function QuestionnaireForm({ code, initialData }: QuestionnaireFormProps) {
  const router = useRouter()
  const [data, setData] = useState<Record<string, unknown>>(initialData as unknown as Record<string, unknown>)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')
  const [submitting, setSubmitting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pendingDataRef = useRef<Record<string, unknown> | null>(null)

  const save = useCallback(async (saveData: Record<string, unknown>) => {
    setSaveStatus('saving')
    try {
      const res = await fetch(`/api/questionnaire/${code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveData),
      })
      if (res.ok) {
        setSaveStatus('saved')
      } else {
        setSaveStatus('error')
      }
    } catch {
      setSaveStatus('error')
    }
  }, [code])

  const debouncedSave = useCallback((newData: Record<string, unknown>) => {
    pendingDataRef.current = newData
    setSaveStatus('unsaved')
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      if (pendingDataRef.current) {
        save(pendingDataRef.current)
        pendingDataRef.current = null
      }
    }, 2000)
  }, [save])

  // Flush pending save on page unload and cleanup on unmount
  useEffect(() => {
    const flushPending = () => {
      if (pendingDataRef.current) {
        const payload = JSON.stringify(pendingDataRef.current)
        navigator.sendBeacon(`/api/questionnaire/${code}`, new Blob([payload], { type: 'application/json' }))
        pendingDataRef.current = null
      }
    }

    window.addEventListener('beforeunload', flushPending)
    return () => {
      window.removeEventListener('beforeunload', flushPending)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      flushPending()
    }
  }, [code])

  const flushSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (pendingDataRef.current) {
      save(pendingDataRef.current)
      pendingDataRef.current = null
    }
  }, [save])

  const updateField = (field: string, value: unknown, immediate?: boolean) => {
    const newData = { ...data, [field]: value }
    setData(newData)
    if (immediate) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      save({ [field]: value })
    } else {
      debouncedSave({ [field]: value })
    }
  }

  const handleManualSave = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    // Build object with only question fields
    const saveData: Record<string, unknown> = {}
    for (const section of sections) {
      for (const q of section.questions) {
        saveData[q.field] = data[q.field]
      }
    }
    await save(saveData)
  }

  const handleSubmit = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setSubmitting(true)
    // First save all data
    const saveData: Record<string, unknown> = {}
    for (const section of sections) {
      for (const q of section.questions) {
        saveData[q.field] = data[q.field]
      }
    }
    await save(saveData)

    // Then submit
    try {
      const res = await fetch('/api/questionnaire/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Nepodařilo se odeslat dotazník. Zkuste to prosím znovu.')
      }
    } catch {
      alert('Nepodařilo se odeslat dotazník. Zkuste to prosím znovu.')
    } finally {
      setSubmitting(false)
    }
  }

  const { answered, total } = countAnswered(data)
  const progress = Math.round((answered / total) * 100)

  return (
    <div>
      {/* Progress bar */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Vyplněno {answered} z {total} otázek
          </span>
          <span className="text-sm font-medium text-primary-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-primary-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <Section key={section.id} title={section.title}>
          {section.questions.map((q) => {
            if (q.type === 'radio') {
              return (
                <QuestionRadio
                  key={q.id}
                  id={q.id}
                  label={q.label}
                  options={q.options!}
                  value={(data[q.field] as string) || null}
                  onChange={(val) => updateField(q.field, val, true)}
                />
              )
            }
            if (q.type === 'checkbox') {
              return (
                <QuestionCheckbox
                  key={q.id}
                  label={q.label}
                  options={q.options!}
                  value={(data[q.field] as string[]) || null}
                  onChange={(val) => updateField(q.field, val, true)}
                />
              )
            }
            return (
              <QuestionText
                key={q.id}
                label={q.label}
                type={q.type}
                value={(data[q.field] as string) || null}
                placeholder={q.placeholder}
                onChange={(val) => updateField(q.field, val)}
                onBlur={flushSave}
              />
            )
          })}
        </Section>
      ))}

      {/* Actions */}
      <div className="card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          {saveStatus === 'saved' && (
            <span className="text-primary-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Uloženo
            </span>
          )}
          {saveStatus === 'saving' && (
            <span className="text-gray-500 flex items-center gap-1">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Ukládání...
            </span>
          )}
          {saveStatus === 'unsaved' && (
            <span className="text-amber-500">Neuložené změny</span>
          )}
          {saveStatus === 'error' && (
            <span className="text-red-500">Chyba při ukládání</span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleManualSave}
            className="btn-secondary"
          >
            Uložit odpovědi
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary"
          >
            {submitting ? 'Odesílání...' : 'Odeslat dotazník'}
          </button>
        </div>
      </div>
    </div>
  )
}
