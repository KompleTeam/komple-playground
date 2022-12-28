import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import Head from "next/head"
import { useAppStore, useTokenModuleStore } from "store"
import { ExecuteResult, toBinary } from "@cosmjs/cosmwasm-stargate"
import {
  TokenModuleUpdateModuleOperators,
  TokenModuleUpdateLocks,
  TokenModuleUpdateTokenLocks,
  TokenModuleUpdateCollectionConfig,
  TokenModuleBurn,
  TokenModuleTransferNFT,
  TokenModuleSendNFT,
  TokenModuleAdminTransferNFT,
  TokenModuleInitWhitelistContract,
  TokenModuleApprove,
  TokenModuleRevoke,
  TokenModuleApproveAll,
  TokenModuleRevokeAll,
} from "components/forms/execute"
import { WHITELIST_MODULE_CODE_ID } from "config/codeIds"
import { showToast } from "utils/showToast"
import { InfoBoxProps } from "components/InfoBox"
import { useKompleClient } from "hooks/kompleClient"

const EXECUTES = [
  "give_operator_access_to_NFT",
  "remove_operator_access_from_NFT",
  "give_operator_access_to_all_NFTs",
  "remove_operator_access_from_all_NFTs",
  "burn_NFT",
  "transfer_NFT",
  "transfer_NFT_as_admin",
  "send_NFT",
  "update_contract_operators",
  "update_contract_locks",
  "update_NFT_locks",
  "update_collection_config",
  "add_whitelist_module",
]

export default function TokenModuleExecute() {
  const { kompleClient } = useKompleClient()

  const store = useTokenModuleStore((state) => state)
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

      const tokenModule = await kompleClient.tokenModule(contract)
      const executeClient = tokenModule.client

      let response: ExecuteResult

      switch (executeMsg) {
        case "give_operator_access_to_NFT": {
          const msg = {
            spender: store.recipient,
            tokenId: store.tokenId,
          }

          response = await executeClient.approve(msg)
          break
        }
        case "remove_operator_access_from_NFT": {
          const msg = {
            spender: store.recipient,
            tokenId: store.tokenId,
          }

          response = await executeClient.revoke(msg)
          break
        }
        case "give_operator_access_to_all_NFTs": {
          const msg = {
            operator: store.recipient,
          }

          response = await executeClient.approveAll(msg)
          break
        }
        case "remove_operator_access_from_all_NFTs": {
          const msg = {
            operator: store.recipient,
          }

          response = await executeClient.revokeAll(msg)
          break
        }
        case "transfer_NFT": {
          const msg = {
            recipient: store.recipient,
            tokenId: store.tokenId,
          }

          response = await executeClient.transferNft(msg)
          break
        }
        case "send_NFT": {
          const msg = {
            contract: store.contract,
            tokenId: store.tokenId,
            msg: toBinary(store.sendMsg),
          }

          response = await executeClient.sendNft(msg)
          break
        }
        case "burn_NFT": {
          const msg = {
            tokenId: store.tokenId,
          }

          response = await executeClient.burn(msg)
          break
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          response = await executeClient.updateModuleOperators(msg)
          break
        }
        case "transfer_NFT_as_admin": {
          const msg = {
            recipient: store.recipient,
            tokenId: store.tokenId,
          }

          response = await executeClient.adminTransferNft(msg)
          break
        }
        case "update_contract_locks": {
          const msg = {
            locks: store.locks,
          }

          response = await executeClient.updateLocks(msg)
          break
        }
        case "update_NFT_locks": {
          const msg = {
            tokenId: store.tokenId,
            locks: store.locks,
          }

          response = await executeClient.updateTokenLocks(msg)
          break
        }
        case "update_collection_config": {
          const msg = {
            collectionConfig: store.collectionConfig,
          }

          response = await executeClient.updateCollectionConfig(msg)
          break
        }
        case "add_whitelist_module": {
          const msg = {
            codeId: WHITELIST_MODULE_CODE_ID,
            instantiateMsg: store.whitelistInstantiateMsg,
          }

          response = await executeClient.initWhitelistContract(msg)
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
      if (executeMsg === "add_whitelist_module") {
        const whitelistAddress = response.logs[0].events
          .find((event) => event.type === "instantiate")
          ?.attributes.find((attr) => attr.key === "_contract_address")?.value
        infoBoxList.push({
          title: "Whitelist Module Address",
          data: whitelistAddress,
          short: true,
        })
      }

      setResponseInfoBoxList(infoBoxList)
      setResponse(response)
      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Execute Token Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Token Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Token Module | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Token Module"
        description="Token Module is used collection configuration and token management."
        documentation={DOC_LINKS.modules.token}
      />
      <ContractForm
        name="Token"
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

        {executeMsg === "give_operator_access_to_NFT" && <TokenModuleApprove />}
        {executeMsg === "remove_operator_access_from_NFT" && (
          <TokenModuleRevoke />
        )}
        {executeMsg === "give_operator_access_to_all_NFTs" && (
          <TokenModuleApproveAll />
        )}
        {executeMsg === "remove_operator_access_from_all_NFTs" && (
          <TokenModuleRevokeAll />
        )}
        {executeMsg === "burn_NFT" && <TokenModuleBurn />}
        {executeMsg === "transfer_NFT" && <TokenModuleTransferNFT />}
        {executeMsg === "transfer_NFT_as_admin" && (
          <TokenModuleAdminTransferNFT />
        )}
        {executeMsg === "send_NFT" && <TokenModuleSendNFT />}
        {executeMsg === "update_contract_operators" && (
          <TokenModuleUpdateModuleOperators />
        )}
        {executeMsg === "update_contract_locks" && <TokenModuleUpdateLocks />}
        {executeMsg === "update_NFT_locks" && <TokenModuleUpdateTokenLocks />}
        {executeMsg === "update_collection_config" && (
          <TokenModuleUpdateCollectionConfig />
        )}
        {executeMsg === "add_whitelist_module" && (
          <TokenModuleInitWhitelistContract />
        )}
      </ContractForm>
    </div>
  )
}
