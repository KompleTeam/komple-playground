import clsx from "clsx"
import { useDropdownClose } from "hooks/dropdownClose"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"

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
      <div className="group-hover:grid">
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
                href={`${text.toLowerCase()}/${item.toLowerCase()}/create`}
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

export const Dropdown = ({
  items,
  title,
  subtitle,
  onChange,
  placeholder,
}: {
  items: string[]
  title: string
  subtitle?: string
  onChange: (index: number) => void
  placeholder?: string
}) => {
  const ref = useRef(null)

  const [opened, setOpened] = useState(false)
  const [idx, setIdx] = useState<number | null>(null)

  useDropdownClose(ref, opened, () => setOpened(false))

  const open = () => {
    setOpened(!opened)
  }

  const select = (index: number) => {
    setIdx(index)
    setOpened(false)
    onChange(index)
  }

  return (
    <div className="mb-6 relative">
      {title && <div className="text-[18px] text-white mb-1">{title}</div>}
      {subtitle && (
        <div className="text-[16px] text-komple-black-100 mb-2">{subtitle}</div>
      )}
      <button
        className="h-[48px] w-[380px] px-4 bg-komple-black-300 rounded-md text-komple-black-100 flex items-center justify-between cursor-pointer capitalize"
        onClick={open}
      >
        {idx !== null ? items[idx].split("_").join(" ") : placeholder}
        <Image
          src="/icons/arrow.svg"
          alt="Arrow"
          height={4}
          width={10}
          className="mr-1"
        />
      </button>
      <div
        className={clsx(
          "absolute bg-komple-black-300 p-5 py-1 w-full left-0 top-20 rounded z-10",
          !opened && "hidden"
        )}
        ref={ref}
      >
        {items.map((item, index) => {
          return (
            <button
              key={item}
              className="flex my-[10px] capitalize text-white hover:text-komple-red-400 w-full"
              onClick={() => select(index)}
            >
              {item.split("_").join(" ")}
            </button>
          )
        })}
      </div>
    </div>
  )
}
