import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import useTokenModuleStore from "store/modules/token"
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
} from "components/forms/execute/token"

const EXECUTES = [
  "burn",
  "transfer_nft",
  "admin_transfer_nft",
  "send_nft",
  "update_module_operators",
  "update_locks",
  "update_token_locks",
  "update_collection_config",
  "create_whitelist_module",
]

export default function TokenModuleExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useTokenModuleStore((state) => state)

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
      const tokenModule = await kompleClient.tokenModule(contract)
      const executeClient = tokenModule.client

      switch (executeMsg) {
        case "transfer_nft": {
          const msg = {
            recipient: store.recipient,
            tokenId: store.tokenId,
          }

          return setResponse(await executeClient.transferNft(msg))
        }
        case "send_nft": {
          const msg = {
            contract: store.contract,
            tokenId: store.tokenId,
            msg: toBinary(store.sendMsg),
          }

          return setResponse(await executeClient.sendNft(msg))
        }
        case "mint": {
          const msg = {
            owner: store.recipient,
            metadataId: store.metadataId,
          }

          return setResponse(await executeClient.mint(msg))
        }
        case "burn": {
          const msg = {
            tokenId: store.tokenId,
          }

          return setResponse(await executeClient.burn(msg))
        }
        case "update_module_operators": {
          const msg = {
            addrs: store.addresses,
          }

          return setResponse(await executeClient.updateModuleOperators(msg))
        }
        case "admin_transfer_nft": {
          const msg = {
            recipient: store.recipient,
            tokenId: store.tokenId,
          }

          return setResponse(await executeClient.adminTransferNft(msg))
        }
        case "update_locks": {
          const msg = {
            locks: store.locks,
          }

          return setResponse(await executeClient.updateLocks(msg))
        }
        case "update_token_locks": {
          const msg = {
            tokenId: store.tokenId,
            locks: store.locks,
          }

          return setResponse(await executeClient.updateTokenLocks(msg))
        }
        case "update_collection_config": {
          const msg = {
            collectionConfig: store.collectionConfig,
          }

          return setResponse(await executeClient.updateCollectionConfig(msg))
        }
        case "init_whitelist_config": {
          const msg = {
            codeId: store.codeId,
            instantiateMsg: store.whitelistInstantiateMsg,
          }

          return setResponse(await executeClient.initWhitelistContract(msg))
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
        <title>Execute Token Module</title>
        <meta property="og:title" content="Execute Token Module" key="title" />
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

        {executeMsg === "burn" && <TokenModuleBurn />}
        {executeMsg === "transfer_nft" && <TokenModuleTransferNFT />}
        {executeMsg === "admin_transfer_nft" && <TokenModuleAdminTransferNFT />}
        {executeMsg === "send_nft" && <TokenModuleSendNFT />}
        {executeMsg === "update_module_operators" && (
          <TokenModuleUpdateModuleOperators />
        )}
        {executeMsg === "update_locks" && <TokenModuleUpdateLocks />}
        {executeMsg === "update_token_locks" && <TokenModuleUpdateTokenLocks />}
        {executeMsg === "update_collection_config" && (
          <TokenModuleUpdateCollectionConfig />
        )}
        {executeMsg === "create_whitelist_module" && (
          <TokenModuleInitWhitelistContract />
        )}
      </ContractForm>
    </div>
  )
}
