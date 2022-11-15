import clsx from "clsx"
import { useMemo, useState } from "react"

export const JsonTextArea = ({
  title,
  subtitle,
  placeholder,
  onChange,
  isRequired,
}: {
  title?: string
  subtitle?: string
  placeholder?: string
  onChange: (value: string) => void
  isRequired?: boolean
}) => {
  const [value, setValue] = useState("")

  const inputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }

  const isValidJson = useMemo(() => {
    try {
      JSON.parse(value)
      return true
    } catch (error) {
      return false
    }
  }, [value])

  return (
    <div className="mb-6">
      {title && (
        <div className="flex text-[18px] text-white mb-1 justify-between items-center">
          <div className="flex">
            {title}
            {isRequired && <div className="text-komple-red-400 ml-2">*</div>}
          </div>
          {value !== "" && (
            <div
              className={clsx(
                "text-[16px]",
                isValidJson ? "text-komple-green" : "text-komple-red-400"
              )}
            >
              Message is {isValidJson ? "valid" : "invalid"}
            </div>
          )}
        </div>
      )}
      {subtitle && (
        <div className="text-[16px] text-komple-black-100 mb-2">{subtitle}</div>
      )}
      <textarea
        placeholder={placeholder}
        className="h-[180px] w-[380px] p-2 bg-komple-black-300 rounded-md text-white"
        onChange={inputOnChange}
        value={value}
      />
    </div>
  )
}
