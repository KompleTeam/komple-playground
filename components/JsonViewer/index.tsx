import clsx from "clsx"
import Image from "next/image"
import { useState } from "react"

export const JsonViewer = ({
  title,
  json,
  isOpen = true,
}: {
  title: string
  json: any
  isOpen?: boolean
}) => {
  const [open, setOpen] = useState(isOpen)

  const copyOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    navigator.clipboard.writeText(JSON.stringify(json))
  }

  return (
    <div className="w-[400px] max-w-[400px] overflow-hidden">
      <div className="border-[2px] border-komple-black-300 rounded-md">
        <button
          className={clsx(
            "flex items-center justify-between w-full p-3",
            open && "border-b-[2px] border-komple-black-300",
            "capitalize font-[14px]"
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center">
            <div className="mr-2">{title}</div>
            <Image
              src="/icons/arrow.svg"
              width={14}
              height={14}
              alt="Arrow Icon"
              className={clsx(open && "transform rotate-180")}
            />
          </div>
          <button onClick={copyOnClick}>
            <Image
              src="/icons/copy.svg"
              width={12}
              height={12}
              alt="Arrow Icon"
              className="mr-2"
            />
          </button>
        </button>
        {open && (
          <pre className="text-white text-[14px] p-3 overflow-scroll">
            {JSON.stringify(json, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
