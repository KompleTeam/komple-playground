import { ReactNode, useEffect, useState } from "react"
import { ContractTabs } from "../ContractTabs"
import { JsonViewer } from "../../JsonViewer"
import { TextInput } from "components/TextInput"
import { useRouter } from "next/router"
import { Button } from "components/Button"
import { isInteger } from "utils/isInteger"
import { useAppStore } from "store"

type ActionType = "create" | "execute" | "query"

export const ContractForm = ({
  children,
  name,
  isModule,
  response,
  action,
  submit,
  hidden = [],
  showResponse,
}: {
  children?: ReactNode
  name: string
  isModule: boolean
  response: Record<string, unknown>
  action: ActionType
  submit: ({ contract, codeId }: { contract: string; codeId: number }) => void
  hidden?: string[]
  showResponse?: boolean
}) => {
  const router = useRouter()

  const loading = useAppStore((state) => state.loading)

  const [codeId, setCodeId] = useState(0)
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
        <ContractTabs
          address={contract}
          contract={name}
          isModule={isModule}
          hidden={hidden}
        />
      </div>
      <div className="w-20" />
      <div>
        {/* {action === "create" && (
          <TextInput
            title="Code ID"
            subtitle="The code ID of the contract to create"
            onChange={(value) =>
              setCodeId(isInteger(value) ? parseInt(value) : 0)
            }
            value={codeId === 0 ? "" : codeId.toString()}
            placeholder="10"
            isRequired
          />
        )} */}

        {(action === "query" || action === "execute") && (
          <TextInput
            title="Contract Address"
            subtitle={`Address of the contract to ${action}`}
            onChange={contractOnChange}
            placeholder="juno...."
            value={contract}
            isRequired
          />
        )}

        <div className="max-w-[380px]">{children}</div>

        <Button
          className="capitalize"
          text={`${action} ${name} ${isModule ? "Module" : "Permission"}`}
          onClick={() => submit({ contract, codeId })}
          loading={loading}
        />
      </div>
      <div className="w-20" />
      {response && (
        <JsonViewer
          title={`${action} Response`}
          json={response}
          isOpen={showResponse}
        />
      )}
    </div>
  )
}
