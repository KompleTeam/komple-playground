import Image from "next/image"
import { getShortAddress } from "utils/getShortAddress"

export interface InfoBoxProps {
  title: string
  data?: string
  short: boolean
}

export const InfoBox = ({ title, data, short }: InfoBoxProps) => {
  const copyOnClick = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div className="mb-2">
      <div className="text-white font-[16px] mb-2">{title}</div>
      <div className="flex h-[48px] w-[400px] px-4 bg-komple-black-800 border-[2px] border-komple-black-300 rounded-md text-white items-center justify-between">
        <div className="max-w-[240px] text-komple-black-100">
          {short ? (
            <>{data ? getShortAddress(data, 45) : ""}</>
          ) : data ? (
            data
          ) : (
            ""
          )}
        </div>
        <button onClick={() => copyOnClick(data || "")}>
          <Image src="/icons/copy.svg" height={14} width={11} alt="Copy Icon" />
        </button>
      </div>
    </div>
  )
}
