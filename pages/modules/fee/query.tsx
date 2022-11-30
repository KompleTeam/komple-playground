import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useFeeModuleStore } from "store"
import {
  FeeModuleFixedFee,
  FeeModuleFixedFees,
  FeeModuleKeys,
  FeeModulePercentageFee,
  FeeModulePercentageFees,
  FeeModuleTotalFixedFees,
  FeeModuleTotalPercentageFees,
} from "components/forms/query"

const QUERIES = [
  "contract_config",
  "show_fixed_fee",
  "show_percentage_fee",
  "list_fixed_fees",
  "list_percentage_fees",
  "show_total_percentage_fees",
  "show_total_fixed_fees",
  "keys",
]

export default function FeeModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useFeeModuleStore((state) => state)

  const [queryMsg, setQueryMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  useEffect(() => {
    store.clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dropdownOnChange = (index: number) => {
    let value = QUERIES[index]
    setQueryMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const feeModule = await kompleClient.feeModule(contract)
      const queryClient = feeModule.queryClient

      switch (queryMsg) {
        case "contract_config":
          return setResponse(await queryClient.config())
        case "show_percentage_fee": {
          const msg = {
            moduleName: store.moduleName,
            feeName: store.feeName,
          }

          return setResponse(await queryClient.percentageFee(msg))
        }
        case "show_fixed_fee": {
          const msg = {
            moduleName: store.moduleName,
            feeName: store.feeName,
          }

          return setResponse(await queryClient.fixedFee(msg))
        }
        case "list_percentage_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await queryClient.percentageFees(msg))
        }
        case "list_fixed_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await queryClient.fixedFees(msg))
        }
        case "show_total_percentage_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await queryClient.totalPercentageFees(msg))
        }
        case "show_total_fixed_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await queryClient.totalFixedFees(msg))
        }
        case "keys": {
          if (!store.feeType) {
            throw new Error("Fee Type is required")
          }

          const msg = {
            feeType: store.feeType,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await queryClient.keys(msg))
        }
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Fee Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Fee Module | Komple Framework Playground"
          key="title"
        />
      </Head>

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

        {queryMsg === "show_percentage_fee" && <FeeModulePercentageFee />}
        {queryMsg === "show_fixed_fee" && <FeeModuleFixedFee />}
        {queryMsg === "list_percentage_fees" && <FeeModulePercentageFees />}
        {queryMsg === "list_fixed_fees" && <FeeModuleFixedFees />}
        {queryMsg === "show_total_percentage_fees" && (
          <FeeModuleTotalPercentageFees />
        )}
        {queryMsg === "show_total_fixed_fees" && <FeeModuleTotalFixedFees />}
        {queryMsg === "keys" && <FeeModuleKeys />}
      </ContractForm>
    </div>
  )
}
