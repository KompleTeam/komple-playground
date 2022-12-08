import clsx from "clsx"
const { DateTimePickerProps } =
  require("react-datetime-picker/dist/entry.nostyle").default
const DateTimePicker =
  require("react-datetime-picker/dist/entry.nostyle").default
import { FaCalendar, FaTimes } from "react-icons/fa"

export const InputDateTime = ({
  title,
  subtitle,
  isRequired,
  className,
  ...rest
}: typeof DateTimePickerProps) => {
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
      <DateTimePicker
        calendarIcon={<FaCalendar className="text-white hover:text-white/80" />}
        className={clsx(
          "bg-white/10 rounded border-2 border-white/20 form-input",
          "placeholder:text-white/50",
          "focus:ring focus:ring-plumbus-20",
          "p-2 w-full",
          className
        )}
        clearIcon={
          <FaTimes className="text-plumbus-40 hover:text-plumbus-60" />
        }
        format="dd/MM/yyyy"
        {...rest}
      />
    </div>
  )
}
