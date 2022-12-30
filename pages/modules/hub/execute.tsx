import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { ExecuteResult, toBinary } from "@cosmjs/cosmwasm-stargate"
import Head from "next/head"
import { useAppStore, useHubModuleStore } from "store"
import {
  HubModuleDeregisterModule,
  HubModuleMigrateContracts,
  HubModuleRegisterModule,
  HubModuleUpdateHubInfo,
  HubModuleUpdateOperators,
} from "components/forms/execute"
import { InfoBoxProps } from "components/InfoBox"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const EXECUTES = [
  "register_module",
  "remove_module",
  "update_hub_info",
  "update_contract_operators",
  "migrate_contracts",
]

export default function HubModuleExecute() {
  const { kompleClient } = useKompleClient()

  const store = useHubModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)
  const setResponseInfoBoxList = useAppStore(
    (state) => state.setResponseInfoBoxList
  )
  const setShowResponse = useAppStore((state) => state.setShowResponse)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  useEffect(() => {
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

      const hubModule = await kompleClient.hubModule(contract)
      const executeClient = hubModule.client

      let response: ExecuteResult

      switch (executeMsg) {
        case "register_module": {
          const msg = {
            codeId: Number(store.codeId),
            module: store.module,
            msg: store.msg !== undefined ? toBinary(store.msg) : undefined,
          }

          response = await executeClient.registerModule(msg)
          break
        }
        case "remove_module": {
          const msg = {
            module: store.module,
          }

          response = await executeClient.deregisterModule(msg)
          break
        }
        case "update_hub_info": {
          const msg = {
            name: store.hubInfo.name,
            description: store.hubInfo.description,
            image: store.hubInfo.image,
            external_link:
              store.hubInfo.external_link === ""
                ? undefined
                : store.hubInfo.external_link,
          }

          response = await executeClient.updateHubInfo(msg)
          break
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          response = await executeClient.updateOperators(msg)
          break
        }
        case "migrate_contracts": {
          if (store.msg === undefined) {
            throw new Error("msg is undefined")
          }

          const msg = {
            codeId: Number(store.codeId),
            contractAddress: store.contractAddress,
            msg: toBinary(store.msg),
          }

          response = await executeClient.migrateContracts(msg)
          break
        }
        default:
          throw new Error("Invalid execute message")
      }

      const infoBoxList: InfoBoxProps[] = [
        {
          title: "Transaction Hash",
          data: response.transactionHash,
          short: true,
        },
      ]
      if (executeMsg === "register_module") {
        const moduleAddress = response.logs[0].events
          .find((event) => event.type === "instantiate")
          ?.attributes.find((attr) => attr.key === "_contract_address")?.value
        infoBoxList.push({
          title: `${store.module} Module Address`,
          data: moduleAddress,
          short: true,
        })
      }

      setResponseInfoBoxList(infoBoxList)
      setResponse(response)
      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Execute Hub Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Hub Module | Komple Playground</title>
        <meta
          property="og:title"
          content="Hub Module | Komple Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Hub Module"
        description="Hub module is the centre piece of the Komple Framework."
        documentation={DOC_LINKS.modules.hub}
      />
      <ContractForm
        name="Hub"
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

        {executeMsg === "register_module" && <HubModuleRegisterModule />}
        {executeMsg === "remove_module" && <HubModuleDeregisterModule />}
        {executeMsg === "update_hub_info" && <HubModuleUpdateHubInfo />}
        {executeMsg === "migrate_contracts" && <HubModuleMigrateContracts />}
        {executeMsg === "update_contract_operators" && (
          <HubModuleUpdateOperators />
        )}
      </ContractForm>
    </div>
  )
}
