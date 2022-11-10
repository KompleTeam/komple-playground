import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
}: {
  items: string[]
  title: string
  subtitle?: string
}) => {
  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)

  const open = () => {
    setOpened(!opened)
  }

  const select = (index: number) => {
    setSelected(index)
    setOpened(false)
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
        {selected
          ? items[selected].split("_").join(" ")
          : "Select query message"}
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
          "absolute bg-komple-black-300 p-5 py-1 w-full left-0 top-20 rounded",
          !opened && "hidden"
        )}
      >
        {items.map((item, index) => {
          return (
            <button
              key={item}
              className="flex my-[10px] capitalize text-white hover:text-komple-red-400"
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
