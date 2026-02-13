'use client'

interface QuestionRadioProps {
  id: string
  label: string
  options: string[]
  value: string | null
  onChange: (value: string) => void
}

export default function QuestionRadio({ id, label, options, value, onChange }: QuestionRadioProps) {
  return (
    <div>
      <p className="font-medium text-gray-800 mb-3">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`
              inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200
              ${value === option
                ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <input
              type="radio"
              name={id}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <div className={`
              w-4 h-4 rounded-full border-2 flex items-center justify-center
              ${value === option ? 'border-primary-500' : 'border-gray-300'}
            `}>
              {value === option && (
                <div className="w-2 h-2 rounded-full bg-primary-500" />
              )}
            </div>
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}
