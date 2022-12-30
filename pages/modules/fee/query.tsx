import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { useFeeModuleStore, useAppStore } from "store"
import {
  FeeModuleFixedFee,
  FeeModuleFixedFees,
  FeeModuleKeys,
  FeeModulePercentageFee,
  FeeModulePercentageFees,
  FeeModuleTotalFixedFees,
  FeeModuleTotalPercentageFees,
} from "components/forms/query"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const QUERIES = [
  "contract_config",
  "get_fixed_fee",
  "get_percentage_fee",
  "list_fixed_fees",
  "list_percentage_fees",
  "get_total_percentage_fees",
  "get_total_fixed_fees",
  "keys",
]

export default function FeeModuleQuery() {
  const { kompleClient } = useKompleClient()

  const store = useFeeModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)
  const setResponseInfoBoxList = useAppStore(
    (state) => state.setResponseInfoBoxList
  )
  const setShowResponse = useAppStore((state) => state.setShowResponse)

  const [queryMsg, setQueryMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  useEffect(() => {
    store.clear()
    setResponseInfoBoxList([])
    setShowResponse(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dropdownOnChange = (index: number) => {
    let value = QUERIES[index]
    setQueryMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      setLoading(true)

      if (!kompleClient) {
        throw new Error("Komple client is not initialized")
      }

      const feeModule = await kompleClient.feeModule(contract)
      const queryClient = feeModule.queryClient

      switch (queryMsg) {
        case "contract_config":
          setResponse(await queryClient.config())
          break
        case "get_percentage_fee": {
          const msg = {
            moduleName: store.moduleName,
            feeName: store.feeName,
          }

          setResponse(await queryClient.percentageFee(msg))
          break
        }
        case "get_fixed_fee": {
          const msg = {
            moduleName: store.moduleName,
            feeName: store.feeName,
          }

          setResponse(await queryClient.fixedFee(msg))
          break
        }
        case "list_percentage_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          setResponse(await queryClient.percentageFees(msg))
          break
        }
        case "list_fixed_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          setResponse(await queryClient.fixedFees(msg))
          break
        }
        case "get_total_percentage_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          setResponse(await queryClient.totalPercentageFees(msg))
          break
        }
        case "get_total_fixed_fees": {
          const msg = {
            moduleName: store.moduleName,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          setResponse(await queryClient.totalFixedFees(msg))
          break
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

          setResponse(await queryClient.keys(msg))
          break
        }
      }

      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Query Fee Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Fee Module | Komple Playground</title>
        <meta
          property="og:title"
          content="Fee Module | Komple Playground"
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

        {queryMsg === "get_percentage_fee" && <FeeModulePercentageFee />}
        {queryMsg === "get_fixed_fee" && <FeeModuleFixedFee />}
        {queryMsg === "list_percentage_fees" && <FeeModulePercentageFees />}
        {queryMsg === "list_fixed_fees" && <FeeModuleFixedFees />}
        {queryMsg === "get_total_percentage_fees" && (
          <FeeModuleTotalPercentageFees />
        )}
        {queryMsg === "get_total_fixed_fees" && <FeeModuleTotalFixedFees />}
        {queryMsg === "keys" && <FeeModuleKeys />}
      </ContractForm>
    </div>
  )
}
