import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import { useFeeModuleStore } from "store"
import {
  FeeModuleDistribute,
  FeeModuleRemoveFee,
  FeeModuleSetFee,
} from "components/forms/execute"

const EXECUTES = ["set_fee", "remove_fee", "distribute", "lock_execute"]

export default function FeeModuleExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useFeeModuleStore((state) => state)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
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

          return setResponse(await executeClient.setFee(msg))
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

          return setResponse(await executeClient.removeFee(msg))
        }
        case "distribute": {
          if (!store.feeType) {
            throw Error("fee type is undefined")
          }

          const msg = {
            feeType: store.feeType,
            moduleName: store.moduleName,
            customPaymentAddresses: store.customPaymentAddresses,
          }

          return setResponse(await executeClient.distribute(msg))
        }
        case "lock_execute":
          return setResponse(await executeClient.lockExecute())
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
        {executeMsg === "distribute" && <FeeModuleDistribute />}
      </ContractForm>
    </div>
  )
}
