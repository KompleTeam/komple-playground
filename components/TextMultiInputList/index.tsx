import { Button } from "components/Button"
import { TextInput } from "components/TextInput"
import Image from "next/image"
import { useState } from "react"

export const TextMultiInputList = ({
  titles,
  subtitle,
  placeholder,
  onChange,
  isRequired,
  value,
}: {
  titles?: [string, string]
  subtitle?: string
  placeholder?: [string, string]
  onChange: (list: Record<string, string>[]) => void
  isRequired?: boolean
  value?: Record<string, string>[]
}) => {
  const [leftText, setLeftText] = useState("")
  const [rightText, setRightText] = useState("")
  const [list, setList] = useState<Record<string, string>[]>(value || [])

  const add = () => {
    if (leftText === "" || rightText === "") return
    setLeftText("")
    setRightText("")
    let newList = [...list, { left: leftText, right: rightText }]
    setList(newList)
    onChange(newList)
  }

  const remove = (idx: number) => {
    const newList = list.filter((_, i) => i !== idx)
    setList(newList)
    onChange(newList)
  }

  return (
    <div className="mb-6">
      <div className="flex items-center">
        {titles !== undefined && titles[0] && (
          <div className="flex text-[18px] text-white mb-1 w-[145px]">
            {titles[0]}
            {isRequired && <div className="text-komple-red-400 ml-2">*</div>}
          </div>
        )}
        {titles !== undefined && titles[1] && (
          <div className="flex text-[18px] text-white mb-1 w-[140px]">
            {titles[1]}
            {isRequired && <div className="text-komple-red-400 ml-2">*</div>}
          </div>
        )}
      </div>
      {subtitle && (
        <div className="text-[16px] text-komple-black-100 mb-2">{subtitle}</div>
      )}
      <div className="flex justify-between">
        <TextInput
          placeholder={placeholder !== undefined ? placeholder[0] : undefined}
          onChange={(value) => setLeftText(value)}
          value={leftText}
          className="w-[140px]"
        />
        <TextInput
          placeholder={placeholder !== undefined ? placeholder[1] : undefined}
          onChange={(value) => setRightText(value)}
          value={rightText}
          className="w-[140px]"
        />
        <Button
          text="Add"
          onClick={add}
          className="w-[90px] mb-3 bg-komple-green text-black"
          disabled={leftText === "" || rightText === ""}
        />
      </div>
      {list.map((item, idx) => {
        return (
          <div
            key={idx.toString()}
            className="flex items-center text-white mb-2"
          >
            <div className="font-bold">{idx + 1}.</div>
            <div className="w-full py-2 px-4 bg-komple-black-300 rounded-md mx-3 max-w-[325px] overflow-scroll">
              {item.left} - {item.right}
            </div>
            <button onClick={() => remove(idx)}>
              <Image
                src="/icons/remove.svg"
                alt="Remove Icon"
                height={24}
                width={24}
                style={{
                  filter:
                    "invert(50%) sepia(88%) saturate(5305%) hue-rotate(349deg) brightness(98%) contrast(94%)",
                }}
              />
            </button>
          </div>
        )
      })}
    </div>
  )
}
