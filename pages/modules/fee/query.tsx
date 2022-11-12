import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { getKeplrSigner, getSigningClient } from "utils/wallet"

import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import {
  FeeModuleQueryForm,
  FeeModuleQueryFormMsg,
  FeeModuleQueryType,
} from "forms/query/Fee"
import { Button } from "components/Button"

const QUERIES: FeeModuleQueryType[] = [
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
  const [query, setQuery] = useState<FeeModuleQueryType>("")
  const [msg, setMsg] = useState<FeeModuleQueryFormMsg>()
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = QUERIES[index]
    setQuery(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      const signer = await getKeplrSigner()
      const client = await getSigningClient(signer)
      const kompleClient = new KompleClient(client, signer)
      const feeModule = await kompleClient.feeModule(contract)
      const queryClient = feeModule.queryClient

      if (!msg) throw Error("msg is undefined")

      switch (query) {
        case "config":
          setResponse(await queryClient.config())
          break
        case "percentage_fee":
          setResponse(
            await queryClient.percentageFee({
              moduleName: msg.moduleName,
              feeName: msg.feeName,
            })
          )
          break
        case "fixed_fee":
          setResponse(
            await queryClient.fixedFee({
              moduleName: msg.moduleName,
              feeName: msg.feeName,
            })
          )
          break
        case "percentage_fees":
          setResponse(
            await queryClient.percentageFees({
              moduleName: msg.moduleName,
              startAfter: msg.startAfter,
              limit: msg.limit,
            })
          )
          break
        case "fixed_fees":
          setResponse(
            await queryClient.fixedFees({
              moduleName: msg.moduleName,
              startAfter: msg.startAfter,
              limit: msg.limit,
            })
          )
          break
        case "total_percentage_fees":
          setResponse(
            await queryClient.totalPercentageFees({
              moduleName: msg.moduleName,
              startAfter: msg.startAfter,
              limit: msg.limit,
            })
          )
          break
        case "total_fixed_fees":
          setResponse(
            await queryClient.totalFixedFees({
              moduleName: msg.moduleName,
              startAfter: msg.startAfter,
              limit: msg.limit,
            })
          )
          break
        case "keys":
          setResponse(
            await queryClient.keys({
              feeType: msg.feeType,
              startAfter: msg.startAfter,
              limit: msg.limit,
            })
          )
          break
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <ContractHeader
        title="Fee Module"
        description="Fee module is used for general fee adjustment and distribution in Komple Framework."
        documentation={DOC_LINKS.modules.fee}
      />

      <ContractForm
        name="Fee"
        isModule={true}
        response={response}
        action="query"
        submit={submit}
      >
        <Dropdown
          items={QUERIES}
          title="Select Query Messages"
          onChange={dropdownOnChange}
          placeholder="Select query message"
        />

        <FeeModuleQueryForm query={query} onChange={setMsg} />

        {query !== "" && <Button text="Query Fee Module" onClick={submit} />}
      </ContractForm>
    </div>
  )
}
