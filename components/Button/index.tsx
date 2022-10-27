import clsx from "clsx"

export const Button = ({
  text,
  onClick,
  disabled = false,
}: {
  text: string
  onClick: () => void
  disabled?: boolean
}) => {
  return (
    <button
      className={clsx(
        "h-[48px] px-[32px] rounded-[4px] w-full",
        "bg-komple-red-400 text-white",
        "text-[16px]",
        disabled && "opacity-50"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
