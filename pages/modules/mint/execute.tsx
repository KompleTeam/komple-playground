import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import {
  MintModuleCreateCollection,
  MintModuleMint,
  MintModuleUpdateCollectionMintLock,
  MintModuleUpdatePublicCollectionCreation,
  MintModuleAdminMint,
  MintModulePermissionMint,
  MintModuleUpdateOperators,
  MintModuleUpdateLinkedCollections,
  MintModuleUpdateCreators,
  MintModuleUpdateCollectionStatus,
} from "components/forms/execute"
import { useMintModuleStore } from "store"
import { toBinary } from "@cosmjs/cosmwasm-stargate"
import { isInteger } from "utils/isInteger"

const EXECUTES = [
  "create_collection",
  "update_public_collection_creation",
  "update_collection_mint_lock",
  "update_collection_creators",
  "mint_NFT",
  "mint_NFT_as_admin",
  "mint_NFT_with_permissions",
  "update_linked_collections",
  "blacklist/whitelist_collection",
  "lock_execute_messages",
  "update_contract_operators",
]

export default function MintModuleExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useMintModuleStore((state) => state)

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
      const mintModule = await kompleClient.mintModule(contract)
      const executeClient = mintModule.client

      switch (executeMsg) {
        case "create_collection": {
          const msg = {
            codeId: store.codeId,
            collectionInfo: store.collectionInfo,
            collectionConfig: {
              per_address_limit:
                store.collectionConfig.per_address_limit === 0
                  ? undefined
                  : store.collectionConfig.per_address_limit,
              start_time:
                store.collectionConfig.start_time === ""
                  ? undefined
                  : store.collectionConfig.start_time,
              max_token_limit:
                store.collectionConfig.max_token_limit === 0
                  ? undefined
                  : store.collectionConfig.max_token_limit,
              ipfs_link:
                store.collectionConfig.ipfs_link === ""
                  ? undefined
                  : store.collectionConfig.ipfs_link,
            },
            tokenInfo: {
              symbol: "KMPL",
              minter: "",
            },
            metadataInfo: store.metadataInfo,
            fundInfo: {
              ...store.fundInfo,
              cw20_address:
                store.fundInfo.cw20_address === ""
                  ? undefined
                  : store.fundInfo.cw20_address,
            },
            linkedCollections: store.collectionsIds,
          }

          return setResponse(await executeClient.createCollection(msg))
        }
        case "update_public_collection_creation": {
          const msg = {
            publicCollectionCreation: store.publicCollectionCreation,
          }

          return setResponse(
            await executeClient.updatePublicCollectionCreation(msg)
          )
        }
        case "update_collection_mint_lock": {
          const msg = {
            collectionId: store.collectionId,
            lock: store.lock,
          }

          return setResponse(await executeClient.updateCollectionMintLock(msg))
        }
        case "mint_NFT": {
          const msg = {
            collectionId: store.collectionId,
            metadataId: store.metadataId === 0 ? undefined : store.metadataId,
          }

          return setResponse(await executeClient.mint(msg))
        }
        case "mint_NFT_as_admin": {
          const msg = {
            collectionId: store.collectionId,
            recipient: store.recipient,
            metadataId: store.metadataId === 0 ? undefined : store.metadataId,
          }

          return setResponse(await executeClient.adminMint(msg))
        }
        case "mint_NFT_with_permissions": {
          const msg = {
            permissionMsg: toBinary(store.permissionMsg),
            mintMsg: {
              collection_id: store.collectionId,
              recipient: store.recipient,
              metadata_id:
                store.metadataId === 0 ? undefined : store.metadataId,
            },
          }

          return setResponse(await executeClient.permissionMint(msg))
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          return setResponse(await executeClient.updateOperators(msg))
        }
        case "update_linked_collections": {
          store.linkedCollections.forEach((id) => {
            if (!isInteger(id)) {
              throw new Error("Linked collection id must be a positive integer")
            }
          })

          const msg = {
            collectionId: store.collectionId,
            linkedCollections: store.linkedCollections.map((item) =>
              Number(item)
            ),
          }

          return setResponse(await executeClient.updateLinkedCollections(msg))
        }
        case "blacklist/whitelist_collection": {
          const msg = {
            collectionId: store.collectionId,
            isBlacklist: store.isBlacklist,
          }

          return setResponse(await executeClient.updateCollectionStatus(msg))
        }
        case "lock_execute_messages": {
          return setResponse(await executeClient.lockExecute())
        }
        case "update_collection_creators": {
          const msg = {
            addrs: store.addresses,
          }

          return setResponse(await executeClient.updateCreators(msg))
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
        <title>Mint Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Mint Module | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Mint Module"
        description="Mint Module is used for collection management and token minting."
        documentation={DOC_LINKS.modules.mint}
      />
      <ContractForm
        name="Mint"
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

        {executeMsg === "create_collection" && <MintModuleCreateCollection />}
        {executeMsg === "update_public_collection_creation" && (
          <MintModuleUpdatePublicCollectionCreation />
        )}
        {executeMsg === "update_collection_mint_lock" && (
          <MintModuleUpdateCollectionMintLock />
        )}
        {executeMsg === "mint_NFT" && <MintModuleMint />}
        {executeMsg === "mint_NFT_as_admin" && <MintModuleAdminMint />}
        {executeMsg === "mint_NFT_with_permissions" && (
          <MintModulePermissionMint />
        )}
        {executeMsg === "update_contract_operators" && (
          <MintModuleUpdateOperators />
        )}
        {executeMsg === "update_linked_collections" && (
          <MintModuleUpdateLinkedCollections />
        )}
        {executeMsg === "blacklist/whitelist_collection" && (
          <MintModuleUpdateCollectionStatus />
        )}
        {executeMsg === "update_collection_creators" && (
          <MintModuleUpdateCreators />
        )}
      </ContractForm>
    </div>
  )
}
