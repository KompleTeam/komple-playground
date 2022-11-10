import { useEffect, useState } from "react"
import { Button } from "components/Button"
import { ContractForm } from "components/ContractForm"
import { ContractHeader } from "components/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { Fee, Fees } from "forms/query/fee"
import { connect } from "utils/wallet"
import { TextInput } from "components/TextInput"
import { useRouter } from "next/router"

const QUERIES = [
  "config",
  "percentage_fee",
  "fixed_fee",
  "percentage_fees",
  "fixed_fees",
  "total_percentage_fees",
  "total_fixed_fees",
  "keys",
]

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

  const dropdownOnChange = (index: number) => {
    let value = QUERIES[index]

    if (value === "config") {
      setMsg({})
    }

    setQueryMsg(value)
  }

  const contractOnChange = (value: string) => {
    window.history.replaceState(null, "", `?contractAddress=${value}`)
    setContract(value)
  }

  const query = async () => {
    try {
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
        title="Fee Module"
        description="Fee module is used for defining dadhsahdas dasj dajajh whajdwhjdw dajdahd dwadad."
        documentation="https://docs.komple.io/komple/framework-fundamentals/modules/fee-module"
      />
      <ContractForm name="Fee" isModule={true} response={response}>
        <TextInput
          title="Contract Address"
          onChange={contractOnChange}
          placeholder="junoa1b2c3d4..."
          value={contract}
        />

        <Dropdown
          items={QUERIES}
          title="Select Query Messages"
          onChange={dropdownOnChange}
        />

        {(queryMsg === "percentage_fee" || queryMsg === "fixed_fee") && (
          <Fee onChange={setMsg} />
        )}

        {(queryMsg === "percentage_fees" ||
          queryMsg === "fixed_fees" ||
          queryMsg === "total_percentage_fees" ||
          queryMsg === "total_fixed_fees") && <Fees onChange={setMsg} />}

        {queryMsg !== null && (
          <Button text="Query Fee Module" onClick={query} disabled={disabled} />
        )}
      </ContractForm>
    </div>
  )
}
