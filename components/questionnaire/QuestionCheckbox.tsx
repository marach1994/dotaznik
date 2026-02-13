'use client'

interface QuestionCheckboxProps {
  label: string
  options: string[]
  value: string[] | null
  onChange: (value: string[]) => void
}

export default function QuestionCheckbox({ label, options, value, onChange }: QuestionCheckboxProps) {
  const selected = value || []

  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div>
      <p className="font-medium text-gray-800 mb-3">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isChecked = selected.includes(option)
          return (
            <label
              key={option}
              className={`
                inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200
                ${isChecked
                  ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(option)}
                className="sr-only"
              />
              <div className={`
                w-4 h-4 rounded border-2 flex items-center justify-center
                ${isChecked ? 'border-primary-500 bg-primary-500' : 'border-gray-300'}
              `}>
                {isChecked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {option}
            </label>
          )
        })}
      </div>
    </div>
  )
}
