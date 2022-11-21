import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { getKeplrSigner, getSigningClient } from "utils/wallet"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import {
  FeeModuleExecuteForm,
  FeeModuleExecuteType,
  FeeModuleExecuteFormMsg,
} from "components/forms/execute"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
import Head from "next/head"
import { useOfflineSigners, useSigningClients } from "graz"

const EXECUTES: FeeModuleExecuteType[] = [
  "set_fee",
  "remove_fee",
  "distribute",
  "lock_execute",
]

export default function FeeModuleExecute() {
  const { data: signingClients } = useSigningClients()
  const { signerAuto } = useOfflineSigners()

  const [executeMsg, setExecuteMsg] = useState<FeeModuleExecuteType>("")
  const [msg, setMsg] = useState<FeeModuleExecuteFormMsg>()
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      if (signingClients?.cosmWasm === undefined || signerAuto === null) {
        throw new Error("client or signer is not ready")
      }
      if (!msg) throw Error("msg is undefined")

      const kompleClient = new KompleClient(signingClients.cosmWasm, signerAuto)
      const feeModule = await kompleClient.feeModule(contract)
      const executeClient = feeModule.client

      switch (executeMsg) {
        case "set_fee":
          return setResponse(
            await executeClient.setFee({
              feeType: msg.feeType,
              moduleName: msg.moduleName,
              feeName: msg.feeName,
              data: toBinary({
                value: msg.feeValue,
                address:
                  msg.paymentAddress === "" ? undefined : msg.paymentAddress,
              }),
            })
          )
        case "remove_fee":
          return setResponse(
            await executeClient.removeFee({
              feeType: msg.feeType,
              moduleName: msg.moduleName,
              feeName: msg.feeName,
            })
          )
        case "distribute":
          return setResponse(
            await executeClient.distribute({
              feeType: msg.feeType,
              moduleName: msg.moduleName,
              customPaymentAddresses: [],
            })
          )
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
        <title>Execute Fee Module</title>
        <meta property="og:title" content="Execute Fee Module" key="title" />
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

        <FeeModuleExecuteForm executeMsg={executeMsg} onChange={setMsg} />
      </ContractForm>
    </div>
  )
}
