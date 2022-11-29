import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"
import useFeeModuleStore from "store/modules/fee"
import {
  FeeModuleFixedFee,
  FeeModuleFixedFees,
  FeeModuleKeys,
  FeeModulePercentageFee,
  FeeModulePercentageFees,
  FeeModuleTotalFixedFees,
  FeeModuleTotalPercentageFees,
} from "components/forms/query/fee"

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
        case "config":
          return setResponse(await queryClient.config())
        case "percentage_fee": {
          const msg = {
            moduleName: store.moduleName,
            feeName: store.feeName,
          }

          return setResponse(await queryClient.percentageFee(msg))
        }
        case "fixed_fee": {
          const msg = {
            moduleName: store.moduleName,
            feeName: store.feeName,
          }

          return setResponse(await queryClient.fixedFee(msg))
        }
        case "percentage_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await queryClient.percentageFees(msg))
        }
        case "fixed_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await queryClient.fixedFees(msg))
        }
        case "total_percentage_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          return setResponse(await queryClient.totalPercentageFees(msg))
        }
        case "total_fixed_fees": {
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
        <title>Query Fee Module</title>
        <meta property="og:title" content="Query Fee Module" key="title" />
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

        {queryMsg === "percentage_fee" && <FeeModulePercentageFee />}
        {queryMsg === "fixed_fee" && <FeeModuleFixedFee />}
        {queryMsg === "percentage_fees" && <FeeModulePercentageFees />}
        {queryMsg === "fixed_fees" && <FeeModuleFixedFees />}
        {queryMsg === "total_percentage_fees" && (
          <FeeModuleTotalPercentageFees />
        )}
        {queryMsg === "total_fixed_fees" && <FeeModuleTotalFixedFees />}
        {queryMsg === "keys" && <FeeModuleKeys />}
      </ContractForm>
    </div>
  )
}
