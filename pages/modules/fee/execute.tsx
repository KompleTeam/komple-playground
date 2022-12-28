import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
import Head from "next/head"
import { useFeeModuleStore, useAppStore } from "store"
import {
  FeeModuleDistribute,
  FeeModuleRemoveFee,
  FeeModuleSetFee,
} from "components/forms/execute"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const EXECUTES = ["set_fee", "remove_fee", "distribute_fees", "lock_execute"]

export default function FeeModuleExecute() {
  const { kompleClient } = useKompleClient()

  const store = useFeeModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)
  const setResponseInfoBoxList = useAppStore(
    (state) => state.setResponseInfoBoxList
  )
  const setShowResponse = useAppStore((state) => state.setShowResponse)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  useEffect(() => {
    store.clear()
    setResponseInfoBoxList([])
    setShowResponse(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      setLoading(true)

      if (!kompleClient) {
        throw new Error("Komple client is not initialized")
      }

      const feeModule = await kompleClient.feeModule(contract)
      const executeClient = feeModule.client

      switch (executeMsg) {
        case "set_fee": {
          if (!store.feeType) {
            throw Error("fee type is undefined")
          }

          const msg = {
            feeType: store.feeType,
            moduleName: store.moduleName,
            feeName: store.feeName,
            data: toBinary({
              value: store.paymentInfo.value,
              address:
                store.paymentInfo.address === ""
                  ? undefined
                  : store.paymentInfo.address,
            }),
          }

          setResponse(await executeClient.setFee(msg))
          break
        }
        case "remove_fee": {
          if (!store.feeType) {
            throw Error("fee type is undefined")
          }

          const msg = {
            feeType: store.feeType,
            moduleName: store.moduleName,
            feeName: store.feeName,
          }

          setResponse(await executeClient.removeFee(msg))
          break
        }
        case "distribute_fees": {
          if (!store.feeType) {
            throw Error("fee type is undefined")
          }

          const msg = {
            feeType: store.feeType,
            moduleName: store.moduleName,
            customPaymentAddresses: store.customPaymentAddresses,
          }

          setResponse(await executeClient.distribute(msg))
          break
        }
        case "lock_execute":
          setResponse(await executeClient.lockExecute())
          break
      }

      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Execute Fee Module",
        message: error.message,
      })
      setLoading(false)
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
        action="execute"
        submit={submit}
      >
        <Dropdown
          items={EXECUTES}
          title="Select Execute Messages"
          onChange={dropdownOnChange}
          placeholder="Select execute message"
        />

        {executeMsg === "set_fee" && <FeeModuleSetFee />}
        {executeMsg === "remove_fee" && <FeeModuleRemoveFee />}
        {executeMsg === "distribute_fees" && <FeeModuleDistribute />}
      </ContractForm>
    </div>
  )
}
