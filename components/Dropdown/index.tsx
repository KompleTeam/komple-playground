import clsx from "clsx"
import Link from "next/link"

export const HoverDropdown = ({
  text,
  data,
  left,
  right,
}: {
  text: string
  data: string[]
  left?: boolean
  right?: boolean
}) => {
  return (
    <div
      className={clsx(
        "group relative inline-block",
        left && "float-left",
        right && "float-right"
      )}
    >
      <button className="text-white uppercase">{text}</button>
      <div className="group-hover:grid pt-3">
        <div
          className={clsx(
            "p-[8px] rounded-[4px]",
            "hidden absolute z-10 group-hover:grid",
            "bg-komple-black-300",
            left && "left-0",
            right && "right-0"
          )}
        >
          {data.map((item) => {
            return (
              <Link
                href={`/${item.toLowerCase()}`}
                className={clsx(
                  "px-3 py-[4px] rounded-[4px]",
                  "text-white hover:bg-komple-black-200"
                )}
                key={item}
              >
                {item}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
