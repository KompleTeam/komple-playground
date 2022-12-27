import Image from "next/image"
import { getShortAddress } from "utils/getShortAddress"

export const InfoBox = ({
  title,
  data,
  short,
}: {
  title: string
  data?: string
  short: boolean
}) => {
  const copyOnClick = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div className="flex items-center">
      <div className="text-komple-black-100 font-[14px] mr-2">{title}</div>
      <div className="flex h-[48px] w-[300px] px-4 bg-komple-black-300 rounded-md text-white items-center justify-between">
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
