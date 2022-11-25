export const TextInput = ({
  title,
  subtitle,
  placeholder,
  onChange,
  isRequired,
  value,
}: {
  title?: string
  subtitle?: string
  placeholder?: string
  onChange: (value: string) => void
  isRequired?: boolean
  value?: string
}) => {
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="mb-6">
      {title && (
        <div className="flex text-[18px] text-white mb-1">
          {title}
          {isRequired && <div className="text-komple-red-400 ml-2">*</div>}
        </div>
      )}
      {subtitle && (
        <div className="text-[16px] text-komple-black-100 mb-2">{subtitle}</div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="h-[48px] w-[380px] px-4 bg-komple-black-300 rounded-md text-white outline-komple-red-400 outline-1"
        onChange={inputOnChange}
        value={value}
      />
    </div>
  )
}
