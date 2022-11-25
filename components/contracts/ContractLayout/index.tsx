import { ReactNode, useEffect, useState } from "react"
import { ContractTabs } from "../ContractTabs"
import { JsonViewer } from "../../JsonViewer"
import { TextInput } from "components/TextInput"
import { useRouter } from "next/router"
import { Button } from "components/Button"

type ActionType = "create" | "execute" | "query"

export const ContractForm = ({
  children,
  name,
  isModule,
  response,
  action,
  submit,
  hidden = [],
}: {
  children?: ReactNode
  name: string
  isModule: boolean
  response: Record<string, unknown>
  action: ActionType
  submit: ({ contract, codeId }: { contract: string; codeId: string }) => void
  hidden?: string[]
}) => {
  const router = useRouter()

  const [codeId, setCodeId] = useState("")
  const [contract, setContract] = useState(
    typeof router.query.contractAddress === "string"
      ? router.query.contractAddress
      : ""
  )

  useEffect(() => {
    if (
      router.query.contractAddress &&
      typeof router.query.contractAddress === "string"
    )
      setContract(router.query.contractAddress)
  }, [router.query])

  const contractOnChange = (value: string) => {
    window.history.replaceState(null, "", `?contractAddress=${value}`)
    setContract(value)
  }

  return (
    <div className="mt-20 flex">
      <div className="block">
        <ContractTabs contract={name} isModule={isModule} hidden={hidden} />
      </div>
      <div className="w-20" />
      <div>
        {action === "create" && (
          <TextInput
            title="Code ID"
            onChange={setCodeId}
            value={codeId}
            placeholder="Code ID of the uploaded contract"
            isRequired
          />
        )}

        {(action === "query" || action === "execute") && (
          <TextInput
            title="Contract Address"
            onChange={contractOnChange}
            placeholder="juno1..."
            value={contract}
            isRequired
          />
        )}

        <div className="max-w-[380px]">{children}</div>

        <Button
          className="capitalize"
          text={`${action} ${name} ${isModule ? "Module" : "Permission"}`}
          onClick={() => submit({ contract, codeId })}
        />
      </div>
      <div className="w-20" />
      {response && <JsonViewer json={response} />}
    </div>
  )
}
