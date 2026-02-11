import Label from '@/components/atoms/Label'
import AppInput from '@/components/atoms/Input'

type FormFieldProps = {
  label: string
  type?: React.HTMLInputTypeAttribute
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  name?: string
  inputClassName?: string
}

export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  name,
  inputClassName
}: FormFieldProps) {
  return (
    <div>
      <Label>{label}</Label>
      <AppInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        name={name}
        className={inputClassName ?? (disabled ? 'w-full border px-3 py-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed' : 'w-full border px-3 py-2 rounded')}
      />
    </div>
  )
}
