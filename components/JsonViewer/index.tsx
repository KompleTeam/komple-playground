import clsx from "clsx"
import Image from "next/image"
import { useAppStore } from "store"
import { showToast } from "utils/showToast"

export const JsonViewer = ({ title, json }: { title: string; json: any }) => {
  const showResponse = useAppStore((state) => state.showResponse)
  const setShowResponse = useAppStore((state) => state.setShowResponse)

  const copyOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      e.stopPropagation()
      navigator.clipboard.writeText(JSON.stringify(json))
      showToast({
        type: "info",
        title: "JSON Message",
        message: "Copied to clipboard",
      })
    } catch (error) {
      showToast({ type: "error", title, message: "Failed to copy" })
    }
  }

  return (
    <div className="w-[400px] max-w-[400px] overflow-hidden">
      <div className="border-[2px] border-komple-black-300 rounded-md">
        <button
          className={clsx(
            "flex items-center justify-between w-full p-3",
            showResponse && "border-b-[2px] border-komple-black-300",
            "capitalize font-[14px]"
          )}
          onClick={() => setShowResponse(!showResponse)}
        >
          <div className="flex items-center">
            <div className="mr-2">{title}</div>
            <Image
              src="/icons/arrow.svg"
              width={14}
              height={14}
              alt="Arrow Icon"
              className={clsx(showResponse && "transform rotate-180")}
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
        {showResponse && (
          <pre className="text-white text-[14px] p-3 overflow-scroll">
            {JSON.stringify(json, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
