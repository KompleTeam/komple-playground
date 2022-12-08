import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import { useAppStore, useTokenModuleStore } from "store"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
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
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useTokenModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      setLoading(true)

      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const tokenModule = await kompleClient.tokenModule(contract)
      const executeClient = tokenModule.client

      switch (executeMsg) {
        case "give_operator_access_to_NFT": {
          const msg = {
            spender: store.recipient,
            tokenId: store.tokenId,
          }

          setResponse(await executeClient.approve(msg))
          break
        }
        case "remove_operator_access_from_NFT": {
          const msg = {
            spender: store.recipient,
            tokenId: store.tokenId,
          }

          setResponse(await executeClient.revoke(msg))
          break
        }
        case "give_operator_access_to_all_NFTs": {
          const msg = {
            operator: store.recipient,
          }

          setResponse(await executeClient.approveAll(msg))
          break
        }
        case "remove_operator_access_from_all_NFTs": {
          const msg = {
            operator: store.recipient,
          }

          setResponse(await executeClient.approveAll(msg))
          break
        }
        case "transfer_NFT": {
          const msg = {
            recipient: store.recipient,
            tokenId: store.tokenId,
          }

          setResponse(await executeClient.transferNft(msg))
          break
        }
        case "send_NFT": {
          const msg = {
            contract: store.contract,
            tokenId: store.tokenId,
            msg: toBinary(store.sendMsg),
          }

          setResponse(await executeClient.sendNft(msg))
          break
        }
        case "burn_NFT": {
          const msg = {
            tokenId: store.tokenId,
          }

          setResponse(await executeClient.burn(msg))
          break
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          setResponse(await executeClient.updateModuleOperators(msg))
          break
        }
        case "transfer_NFT_as_admin": {
          const msg = {
            recipient: store.recipient,
            tokenId: store.tokenId,
          }

          setResponse(await executeClient.adminTransferNft(msg))
          break
        }
        case "update_contract_locks": {
          const msg = {
            locks: store.locks,
          }

          setResponse(await executeClient.updateLocks(msg))
          break
        }
        case "update_NFT_locks": {
          const msg = {
            tokenId: store.tokenId,
            locks: store.locks,
          }

          setResponse(await executeClient.updateTokenLocks(msg))
          break
        }
        case "update_collection_config": {
          const msg = {
            collectionConfig: store.collectionConfig,
          }

          setResponse(await executeClient.updateCollectionConfig(msg))
          break
        }
        case "add_whitelist_module": {
          const msg = {
            codeId: store.codeId,
            instantiateMsg: store.whitelistInstantiateMsg,
          }

          setResponse(await executeClient.initWhitelistContract(msg))
          break
        }
      }

      setLoading(false)
    } catch (error: any) {
      setResponse(error.message)
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
