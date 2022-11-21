import { Dropdown } from "components/Dropdown"
import { Seperator } from "components/Seperator"
import { TextInput } from "components/TextInput"
import { TextInputList } from "components/TextInputList"
import {
  CollectionInfo,
  CollectionConfig,
  TokenInfo,
  MetadataInfo,
  CollectionFundInfo,
  MintMsg,
} from "komplejs/lib/cjs/types/ts-files/MintModule.types"
import {
  Collections,
  Metadata,
} from "komplejs/lib/cjs/types/ts-files/TokenModule.types"
import { useEffect, useState } from "react"

export type MintModuleExecuteType =
  | ""
  | "create_collection"
  | "update_public_collection_creation"
  | "update_collection_mint_lock"
  | "mint"
  | "admin_mint"
  | "permission_mint"
  | "update_operators"
  | "update_linked_collections"
  | "update_collection_status"
  | "lock_execute"
  | "update_creators"

export interface MintModuleExecuteFormMsg {
  codeId: string
  collectionInfo: CollectionInfo
  collectionConfig: CollectionConfig
  tokenInfo: TokenInfo
  metadataInfo: MetadataInfo
  collectionFundInfo: CollectionFundInfo
  linkedCollections: string[]
  collectionId: string
  // metadataId: string
  isPublicCollectionCreation: boolean
  lock: boolean
  // recipient: string
  // permissionMsg: string
  // mintMsg: MintMsg
  // operators: string[]
  // isBlacklist: boolean
}

export interface MintModuleExecuteInterface {
  executeMsg: MintModuleExecuteType
  onChange: (msg: MintModuleExecuteFormMsg) => void
}

export const MintModuleExecuteForm = ({
  executeMsg,
  onChange,
}: MintModuleExecuteInterface) => {
  // CREATE_COLLECTION
  const [tokenCodeId, setTokenCodeId] = useState("")
  /* Collection Info */
  const [collectionType, setCollectionType] = useState("")
  const [collectionName, setCollectionName] = useState("")
  const [collectionDescription, setCollectionDescription] = useState("")
  const [collectionImage, setCollectionImage] = useState("")
  const [collectionExternalLink, setCollectionExternalLink] = useState("")
  /* Collection Config */
  const [perAddressLimit, setPerAddressLimit] = useState("")
  const [startTime, setStartTime] = useState("")
  const [maxTokenLimit, setMaxTokenLimit] = useState("")
  const [ipfsLink, setIpfsLink] = useState("")
  /* Token */
  const [collectionSymbol, setCollectionSymbol] = useState("")
  const [collectionMinter, setCollectionMinter] = useState("")
  /* Metadata Info */
  const [metadataCodeId, setMetadataCodeId] = useState("")
  const [metadataType, setMetadataType] = useState("")
  /* Fund Info */
  const [isNative, setIsNative] = useState(true)
  const [denom, setDenom] = useState("")
  const [cw20Address, setCw20Address] = useState("")

  const [linkedCollections, setLinkedCollections] = useState<string[]>([])

  // UPDATE_PUBLIC_COLLECTION_CREATION
  const [isPublicCollectionCreation, setIsPublicCollectionCreation] =
    useState(false)

  // UPDATE_COLLECTION_MINT_LOCK
  // MINT
  // ADMIN_MINT
  // PERMISSION_MINT
  // UPDATE_LINKED_COLLECTIONS
  // UPDATE_COLLECTION_STATUS
  const [collectionId, setCollectionId] = useState("")

  // UPDATE_COLLECTION_MINT_LOCK
  const [lock, setLock] = useState(false)

  // ADMIN_MINT
  // PERMISSION_MINT
  const [recipient, setRecipient] = useState("")

  // PERMISSION_MINT
  const [permissionMsg, setPermissionMsg] = useState("")

  useEffect(() => {
    onChange({
      codeId: tokenCodeId,
      collectionInfo: {
        collection_type: collectionType as Collections,
        name: collectionName,
        description: collectionDescription,
        image: collectionImage,
        external_link: collectionExternalLink,
      },
      collectionConfig: {
        per_address_limit: Number(perAddressLimit),
        start_time: startTime,
        max_token_limit: Number(maxTokenLimit),
        ipfs_link: ipfsLink,
      },
      tokenInfo: {
        symbol: collectionSymbol,
        minter: collectionMinter,
      },
      metadataInfo: {
        code_id: Number(metadataCodeId),
        instantiate_msg: {
          metadata_type: metadataType as Metadata,
        },
      },
      collectionFundInfo: {
        is_native: isNative,
        denom,
        cw20_address: cw20Address,
      },
      linkedCollections,
      isPublicCollectionCreation,
      lock,
      collectionId,
    })
  }, [
    onChange,
    tokenCodeId,
    collectionType,
    collectionName,
    collectionDescription,
    collectionImage,
    collectionExternalLink,
    perAddressLimit,
    startTime,
    maxTokenLimit,
    ipfsLink,
    collectionSymbol,
    collectionMinter,
    metadataCodeId,
    metadataType,
    isNative,
    denom,
    cw20Address,
    linkedCollections,
    isPublicCollectionCreation,
    lock,
    collectionId,
  ])

  const collectionTypeOnChange = (index: number) => {
    let value = (index === 0 ? "standard" : "komple") as Collections
    setCollectionType(value)
  }

  const metadataTypeOnChange = (index: number) => {
    let value: Metadata = "standard"
    switch (index) {
      case 0:
        value = "standard"
        break
      case 1:
        value = "shared"
        break
      case 2:
        value = "dynamic"
        break
    }
    setMetadataType(value)
  }

  return (
    <div>
      {executeMsg === "create_collection" && (
        <>
          <Seperator text="Token Module" />
          <TextInput
            title="Token Module Code ID"
            onChange={setTokenCodeId}
            isRequired
          />
        </>
      )}

      {executeMsg === "create_collection" && (
        <>
          <Seperator text="Collection Info" />
          <Dropdown
            items={["standard", "komple"]}
            title="Collection Type"
            onChange={collectionTypeOnChange}
            placeholder="Select Fee Type"
            isRequired
          />
          <TextInput
            title="Collection Name"
            onChange={setCollectionName}
            isRequired
          />
          <TextInput
            title="Collection Description"
            onChange={setCollectionDescription}
            isRequired
          />
          <TextInput
            title="Collection Image"
            onChange={setCollectionImage}
            isRequired
          />
          <TextInput
            title="Collection External Link"
            onChange={setCollectionExternalLink}
          />
          <Seperator text="Collection Config" />
          <TextInput title="Per Address Limit" onChange={setPerAddressLimit} />
          <TextInput title="Start Time" onChange={setStartTime} />
          <TextInput title="Max Token Limit" onChange={setMaxTokenLimit} />
          <TextInput title="IPFS Link" onChange={setIpfsLink} />
          <Seperator text="Token Info" />
          <TextInput title="Symbol" onChange={setCollectionSymbol} isRequired />
          <TextInput title="Minter" onChange={setCollectionMinter} isRequired />
          <Seperator text="Metadata Info" />
          <Dropdown
            items={["standard", "shared", "dynamic"]}
            title="Metadata Type"
            onChange={metadataTypeOnChange}
            placeholder="Select Metadata Type"
            isRequired
          />
          <Seperator text="Fund Info" />
          <TextInput title="Denom" onChange={setDenom} isRequired />
          <TextInput title="CW20 Address" onChange={setCw20Address} />
          <Seperator text="Collections" />
          <TextInputList
            title="Linked Collection IDs"
            onChange={() => {}}
            placeholder="1"
          />
        </>
      )}
    </div>
  )
}
