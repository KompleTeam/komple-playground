import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { RemoveFee, SetFee } from "forms/execute"
import { useAccount } from "graz"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { connect } from "utils/wallet"
import { Button } from "components/Button"
import { ContractForm } from "components/ContractForm"
import { ContractHeader } from "components/ContractHeader"
import { TextInput } from "components/TextInput"
import { HubExecuteRegisterModule } from "forms/execute/hub"

const EXECUTES = [
  "register_module",
  "deregister_module",
  "update_hub_info",
  "update_operators",
  "migrate_contracts",
]

export default function FeeModuleExecute() {
  const router = useRouter()
  const { data: account } = useAccount()

  const [contract, setContract] = useState(
    typeof router.query.contractAddress === "string"
      ? router.query.contractAddress
      : ""
  )
  const [executeMsg, setExecuteMsg] = useState<string | null>(null)
  const [msg, setMsg] = useState({})
  const [response, setResponse] = useState<any>({})

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

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const execute = async () => {
    try {
      setResponse({})
      console.log(msg)
      const client = await connect()
      const res = await client.execute(
        account?.bech32Address || "",
        contract,
        {
          [`${executeMsg}`]: msg,
        },
        "auto"
      )
      setResponse(res)
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  const disabled = false

  return (
    <div className="h-full w-full">
      <ContractHeader
        title="Hub Module"
        description="Hub module is the centre piece of the Komple Framework."
        documentation={DOC_LINKS.modules.hub}
      />
      <ContractForm name="Hub" isModule={true} response={response}>
        <TextInput
          title="Contract Address"
          onChange={contractOnChange}
          placeholder="junoa1b2c3d4..."
          value={contract}
        />
        <Dropdown
          items={EXECUTES}
          title="Select Execute Messages"
          onChange={dropdownOnChange}
          placeholder="Select execute message"
        />

        {executeMsg === "register_module" && (
          <HubExecuteRegisterModule onChange={setMsg} />
        )}

        <Button
          text="Execute Fee Module"
          onClick={execute}
          disabled={disabled}
        />
      </ContractForm>
    </div>
  )
}
