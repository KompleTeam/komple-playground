import { useWallet } from "@cosmos-kit/react"
import clsx from "clsx"
import { Button } from "components/Button"
import { ContractHeader } from "components/contracts/ContractHeader"
import { JsonViewer } from "components/JsonViewer"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { getShortAddress } from "utils/getShortAddress"

export const Upload = () => {
  const { isWalletConnected, address, getSigningCosmWasmClient } = useWallet()

  const inputFile = useRef<HTMLInputElement>(null)

  const [response, setResponse] = useState<any>({})
  const [wasmFile, setWasmFile] = useState<File | null>(null)
  const [wasmByteArray, setWasmByteArray] = useState<Uint8Array | null>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setWasmFile(e.target.files[0])
  }

  useEffect(() => {
    if (wasmFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          if (!e.target?.result) return
          const byteArray = new Uint8Array(e.target.result as ArrayBuffer)
          setWasmByteArray(byteArray)
        } catch (error: any) {}
      }
      reader.readAsArrayBuffer(wasmFile)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasmFile])

  const copyOnClick = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  const submit = async () => {
    try {
      if (!isWalletConnected) return setResponse("Please connect your wallet")
      if (!wasmFile || !wasmByteArray)
        return setResponse("No wasm file selected")

      const client = await getSigningCosmWasmClient()
      if (!client) return

      const result = await client.upload(address || "", wasmByteArray, "auto")
      setResponse({
        transactionHash: result.transactionHash,
        codeId: result.codeId,
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        originalChecksum: result.originalChecksum,
        compressedChecksum: result.compressedChecksum,
      })
    } catch (err: any) {
      setResponse(err.message)
    }
  }

  const renderInfoBox = ({
    title,
    data,
    short,
  }: {
    title: string
    data?: string
    short: boolean
  }) => {
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
            <Image
              src="/icons/copy.svg"
              height={14}
              width={11}
              alt="Copy Icon"
            />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Upload Contract</title>
        <meta property="og:title" content="Upload Contract" key="title" />
      </Head>

      <ContractHeader
        title="Upload Contract"
        description="Upload official or custom wasm binary for Komple Framework."
      />

      <div className="mt-[64px] flex justify-center h-[160px]">
        <div>
          <div
            className={clsx(
              "flex relative justify-center items-center space-y-4 p-6 w-[380px]",
              "rounded border-2 border-white/20 border-dashed mb-5"
            )}
          >
            <input
              accept=".wasm"
              className={clsx(
                "file:py-2 file:px-4 file:mr-4 file:bg-plumbus-light file:rounded file:border-0 cursor-pointer",
                "before:absolute before:inset-0 before:hover:bg-white/5 before:transition",
                !wasmFile ? "text-white/50" : "text-white"
              )}
              onChange={onFileChange}
              ref={inputFile}
              type="file"
            />
          </div>

          <Button
            text="Upload Contract"
            onClick={submit}
            disabled={!wasmFile || !wasmByteArray}
          />
        </div>

        <div className="border-[1px] border-komple-black-300 mx-[32px]" />

        <div className="flex flex-col justify-around">
          <div className="flex text-[18px] text-white mb-1 justify-between">
            Contract Details
          </div>
          {renderInfoBox({
            title: "Tx Hash",
            data: response.transactionHash,
            short: true,
          })}
          {renderInfoBox({
            title: "Code ID",
            data: response.codeId,
            short: false,
          })}
        </div>
      </div>
    </div>
  )
}

export default Upload
