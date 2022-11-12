import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { RemoveFee, SetFee } from "forms/execute"
import { useAccount } from "graz"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { connect } from "utils/wallet"
import { Button } from "components/Button"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { TextInput } from "components/TextInput"

const EXECUTES = [
  "set_fee",
  "remove_fee",
  "distribute",
  "lock_execute",
  "receive",
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

    if (value === "lock_execute") {
      setMsg({})
    }

    setExecuteMsg(value)
  }

  const execute = async () => {
    try {
      setResponse({})

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
        title="Fee Module"
        description="Fee module is used for general fee adjustment and distribution in Komple Framework."
        documentation={DOC_LINKS.modules.fee}
      />
      <ContractForm name="Fee" isModule={true} response={response}>
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

        {executeMsg === "set_fee" && <SetFee onChange={setMsg} />}

        {executeMsg === "remove_fee" && <RemoveFee onChange={setMsg} />}

        <Button
          text="Execute Fee Module"
          onClick={execute}
          disabled={disabled}
        />
      </ContractForm>
    </div>
  )
}
