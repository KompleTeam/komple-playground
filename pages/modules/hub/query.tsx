import { useEffect, useState } from "react"
import { Button } from "components/Button"
import { ContractForm } from "components/ContractForm"
import { ContractHeader } from "components/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { Fee, Fees } from "forms/query/fee"
import { connect } from "utils/wallet"
import { TextInput } from "components/TextInput"
import { useRouter } from "next/router"
import { DOC_LINKS } from "config/docs"
import { HubQueryModuleAddress } from "forms/query"

const QUERIES = ["config", "module_address", "operators"]

export default function FeeModuleQuery() {
  const router = useRouter()

  const [contract, setContract] = useState(
    typeof router.query.contractAddress === "string"
      ? router.query.contractAddress
      : ""
  )
  const [queryMsg, setQueryMsg] = useState<string | null>(null)
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
    let value = QUERIES[index]

    if (value === "config" || value === "operators") {
      setMsg({})
    }

    setQueryMsg(value)
  }

  const query = async () => {
    try {
      setResponse({})

      const client = await connect()
      const res = await client.queryContractSmart(contract, {
        [`${queryMsg}`]: msg,
      })
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
          placeholder="juno1..."
          value={contract}
        />

        <Dropdown
          items={QUERIES}
          title="Select Query Messages"
          onChange={dropdownOnChange}
          placeholder="Select query message"
        />

        {queryMsg === "module_address" && (
          <HubQueryModuleAddress onChange={setMsg} />
        )}

        {queryMsg !== null && (
          <Button text="Query Fee Module" onClick={query} disabled={disabled} />
        )}
      </ContractForm>
    </div>
  )
}
