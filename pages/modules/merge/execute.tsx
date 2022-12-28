import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import Head from "next/head"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
import { useAppStore, useMergeModuleStore } from "store"
import {
  MergeModuleMerge,
  MergeModulePermissionMerge,
  MergeModuleUpdateMergeLock,
  MergeModuleUpdateOperators,
} from "components/forms/execute"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const EXECUTES = [
  "update_merge_lock",
  "merge_NFTs",
  "merge_NFTs_with_permissions",
  "update_contract_operators",
  "lock_execute_messages",
]

export default function MergeModuleExecute() {
  const { kompleClient } = useKompleClient()

  const store = useMergeModuleStore((state) => state)
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

      const mergeModule = await kompleClient.mergeModule(contract)
      const executeClient = mergeModule.client

      switch (executeMsg) {
        case "update_merge_lock": {
          const msg = {
            lock: store.lock,
          }

          setResponse(await executeClient.updateMergeLock(msg))
          break
        }
        case "merge_NFTs": {
          const msg = {
            msg: {
              recipient: store.recipient,
              mint_id: store.mintId,
              metadata_id:
                store.metadataId === 0 ? undefined : store.metadataId,
              burn_ids: store.burnIds,
            },
          }

          setResponse(await executeClient.merge(msg))
          break
        }
        case "merge_NFTs_with_permissions": {
          const msg = {
            permissionMsg: toBinary(store.permissionMsg),
            mergeMsg: {
              recipient: store.recipient,
              mint_id: store.mintId,
              metadata_id: store.metadataId,
              burn_ids: store.burnIds,
            },
          }

          setResponse(await executeClient.permissionMerge(msg))
          break
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          setResponse(await executeClient.updateOperators(msg))
          break
        }
        case "lock_execute_messages": {
          setResponse(await executeClient.lockExecute())
          break
        }
      }

      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Execute Merge Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Merge Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Merge Module | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Merge Module"
        description="Merge Module is used for merging multiple tokens and minting a new one."
        documentation={DOC_LINKS.modules.merge}
      />
      <ContractForm
        name="Merge"
        isModule={true}
        response={response}
        action="execute"
        submit={submit}
        hidden={["create"]}
      >
        <Dropdown
          items={EXECUTES}
          title="Select Execute Messages"
          onChange={dropdownOnChange}
          placeholder="Select execute message"
        />

        {executeMsg === "update_merge_lock" && <MergeModuleUpdateMergeLock />}
        {executeMsg === "merge_NFTs" && <MergeModuleMerge />}
        {executeMsg === "merge_NFTs_with_permissions" && (
          <MergeModulePermissionMerge />
        )}
        {executeMsg === "update_contract_operators" && (
          <MergeModuleUpdateOperators />
        )}
      </ContractForm>
    </div>
  )
}
