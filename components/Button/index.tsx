import clsx from "clsx"

export const Button = ({
  text,
  disabled = false,
  onClick,
  className,
}: {
  text: string
  disabled?: boolean
  onClick: (data?: any) => void
  className?: string
}) => {
  return (
    <button
      className={clsx(
        "h-[48px] px-[32px] rounded-[4px] w-full",
        "bg-komple-red-400 text-white",
        "text-[16px]",
        disabled && "opacity-50",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
