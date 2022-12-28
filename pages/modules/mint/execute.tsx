import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import Head from "next/head"
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
import { useAppStore, useMintModuleStore } from "store"
import { ExecuteResult, toBinary } from "@cosmjs/cosmwasm-stargate"
import { isInteger } from "utils/isInteger"
import { METADATA_MODULE_CODE_ID, TOKEN_MODULE_CODE_ID } from "config/codeIds"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"
import { InfoBoxProps } from "components/InfoBox"

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
  const { kompleClient } = useKompleClient()

  const store = useMintModuleStore((state) => state)
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

      const mintModule = await kompleClient.mintModule(contract)
      const executeClient = mintModule.client

      let response: ExecuteResult

      switch (executeMsg) {
        case "create_collection": {
          const msg = {
            codeId: TOKEN_MODULE_CODE_ID,
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
            metadataInfo: {
              code_id: METADATA_MODULE_CODE_ID,
              instantiate_msg: store.metadataInfo.instantiate_msg,
            },
            fundInfo: {
              ...store.fundInfo,
              cw20_address:
                store.fundInfo.cw20_address === ""
                  ? undefined
                  : store.fundInfo.cw20_address,
            },
            linkedCollections: [],
          }

          response = await executeClient.createCollection(msg)
          break
        }
        case "update_public_collection_creation": {
          const msg = {
            publicCollectionCreation: store.publicCollectionCreation,
          }

          response = await executeClient.updatePublicCollectionCreation(msg)
          break
        }
        case "update_collection_mint_lock": {
          const msg = {
            collectionId: store.collectionId,
            lock: store.lock,
          }

          response = await executeClient.updateCollectionMintLock(msg)
          break
        }
        case "mint_NFT": {
          const msg = {
            collectionId: store.collectionId,
            metadataId: store.metadataId === 0 ? undefined : store.metadataId,
          }

          response = await executeClient.mint(msg)
          break
        }
        case "mint_NFT_as_admin": {
          const msg = {
            collectionId: store.collectionId,
            recipient: store.recipient,
            metadataId: store.metadataId === 0 ? undefined : store.metadataId,
          }

          response = await executeClient.adminMint(msg)
          break
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

          response = await executeClient.permissionMint(msg)
          break
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          response = await executeClient.updateOperators(msg)
          break
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

          response = await executeClient.updateLinkedCollections(msg)
          break
        }
        case "blacklist/whitelist_collection": {
          const msg = {
            collectionId: store.collectionId,
            isBlacklist: store.isBlacklist,
          }

          response = await executeClient.updateCollectionStatus(msg)
          break
        }
        case "lock_execute_messages": {
          response = await executeClient.lockExecute()
          break
        }
        case "update_collection_creators": {
          const msg = {
            addrs: store.addresses,
          }

          response = await executeClient.updateCreators(msg)
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
      if (executeMsg === "create_collection") {
        const addresses = response.logs[0].events
          .find((event) => event.type === "instantiate")
          ?.attributes.filter((attr) => attr.key === "_contract_address")
          ?.map((item) => item.value)
        infoBoxList.push({
          title: "Token Module Address",
          data: addresses ? addresses[0] : undefined,
          short: true,
        })
        infoBoxList.push({
          title: "Metadata Module Address",
          data: addresses ? addresses[1] : undefined,
          short: true,
        })
      }

      setLoading(false)
      setResponse(response)
      setResponseInfoBoxList(infoBoxList)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Execute Mint Module",
        message: error.message,
      })
      setLoading(false)
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
