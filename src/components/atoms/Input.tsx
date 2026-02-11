'use client'

import { useState } from 'react'
import { Eye, EyeSlash } from '@phosphor-icons/react'

type AppInputProps = {
  type?: React.HTMLInputTypeAttribute
  value: string
  onChange: (value: string) => void
  placeholder?: string
  name?: string
  required?: boolean
  disabled?: boolean
  className?: string
  showPasswordToggle?: boolean
}

export default function AppInput({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  name,
  required = false,
  disabled = false,
  className,
  showPasswordToggle = false
}: AppInputProps) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <div className={`${className ?? 'input w-full'} relative flex items-center`}>
      <input
        className="w-full"
        type={inputType}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {isPassword && showPasswordToggle && (
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 text-gray-400 hover:text-gray-600"
        >
          {visible ? <EyeSlash className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  )
}
