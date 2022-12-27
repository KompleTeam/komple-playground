import { useWallet } from "@cosmos-kit/react"
import clsx from "clsx"
import { Button } from "components/Button"
import { ContractHeader } from "components/contracts/ContractHeader"
import { InfoBox } from "components/InfoBox"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { useAppStore } from "store"

export const Upload = () => {
  const { isWalletConnected, address, getSigningCosmWasmClient } = useWallet()

  const inputFile = useRef<HTMLInputElement>(null)

  const store = useAppStore((state) => state)

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

  const submit = async () => {
    try {
      if (!isWalletConnected) return setResponse("Please connect your wallet")
      if (!wasmFile || !wasmByteArray)
        return setResponse("No wasm file selected")

      store.setLoading(true)

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

      store.setLoading(false)
    } catch (err: any) {
      setResponse(err.message)
      store.setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Upload Contract | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Upload Contract | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Upload Contract"
        description="Upload a wasm binary to use with Komple Framework."
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
            disabled={!wasmFile || !wasmByteArray || store.loading}
            loading={store.loading}
          />
        </div>

        <div className="border-[1px] border-komple-black-300 mx-[32px]" />

        <div className="flex flex-col justify-around">
          <InfoBox
            title="Tx Hash"
            data={response.transactionHash}
            short={true}
          />
          <InfoBox title="Code ID" data={response.codeId} short={false} />
        </div>
      </div>
    </div>
  )
}

export default Upload
