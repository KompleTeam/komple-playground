import { ReactNode } from "react"
import { ContractTabs } from "../ContractTabs"
import { JsonViewer } from "../JsonViewer"

export const ContractForm = ({
  children,
  name,
  isModule,
  response,
}: {
  children: ReactNode
  name: string
  isModule: boolean
  response: Record<string, unknown>
}) => {
  return (
    <div className="mt-20 flex">
      <ContractTabs contract={name} isModule={isModule} />
      <div className="w-20" />
      <div>{children}</div>
      <div className="w-20" />
      {response && <JsonViewer json={response} />}
    </div>
  )
}
