'use client'

interface QuestionTextProps {
  label: string
  type: 'text' | 'textarea'
  value: string | null
  placeholder?: string
  onChange: (value: string) => void
  onBlur?: () => void
}

export default function QuestionText({ label, type, value, placeholder, onChange, onBlur }: QuestionTextProps) {
  return (
    <div>
      <p className="font-medium text-gray-800 mb-3">{label}</p>
      {type === 'textarea' ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={5000}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800
            placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            transition-all duration-200 resize-y"
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={500}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800
            placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            transition-all duration-200"
        />
      )}
    </div>
  )
}
