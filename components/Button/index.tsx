import clsx from "clsx"

export const Button = ({
  text,
  onClick,
}: {
  text: string
  onClick: () => void
}) => {
  return (
    <button
      className={clsx(
        "h-[40px] px-[32px] rounded-[4px]",
        "bg-komple-red-400 text-white",
        " text-[16px]"
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
