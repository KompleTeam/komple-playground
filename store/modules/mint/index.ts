import {
  CollectionConfig,
  CollectionFundInfo,
  CollectionInfo,
  Collections,
  Metadata,
  MetadataInfo,
  TokenInfo,
} from "komplejs/lib/cjs/types/ts-types/MintModule.types"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface MintModuleStore {
  admin: string
  codeId: number
  collectionInfo: CollectionInfo
  collectionConfig: CollectionConfig
  tokenInfo: TokenInfo
  metadataInfo: MetadataInfo
  fundInfo: CollectionFundInfo
  linkedCollections: string[]
  publicCollectionCreation: boolean
  collectionId: number
  lock: boolean
  metadataId?: number
  recipient: string
  collectionsIds: number[]
  addresses: string[]
  isBlacklist: boolean
  permissionMsg: Record<string, unknown>
}

export interface MintModuleActions {
  clear: () => void
  setAdmin: (admin: string) => void
  setCodeId: (codeId: number) => void
  setCollectionInfo: (collectionInfo: CollectionInfo) => void
  setCollectionConfig: (collectionConfig: CollectionConfig) => void
  setTokenInfo: (tokenInfo: TokenInfo) => void
  setMetadataInfo: (metadataInfo: MetadataInfo) => void
  setFundInfo: (fundInfo: CollectionFundInfo) => void
  setLinkedCollections: (linkedCollections: string[]) => void
  setPublicCollectionCreation: (publicCollectionCreation: boolean) => void
  setCollectionId: (collectionId: number) => void
  setLock: (lock: boolean) => void
  setMetadataId: (metadataId: number) => void
  setRecipient: (recipient: string) => void
  setAddresses: (addresses: string[]) => void
  setCollectionIds: (collectionsIds: number[]) => void
  setIsBlacklist: (isBlacklist: boolean) => void
  setPermissionMsg: (permissionMsg: Record<string, unknown>) => void
}

const initialState: MintModuleStore = {
  admin: "",
  codeId: 0,
  collectionInfo: {
    collection_type: "" as Collections,
    name: "",
    description: "",
    image: "",
    external_link: undefined,
  },
  collectionConfig: {
    ipfs_link: undefined,
    max_token_limit: undefined,
    per_address_limit: undefined,
    start_time: undefined,
  },
  tokenInfo: {
    minter: "",
    symbol: "",
  },
  metadataInfo: {
    code_id: 0,
    instantiate_msg: {
      metadata_type: "" as Metadata,
    },
  },
  fundInfo: {
    is_native: true,
    denom: "",
    cw20_address: undefined,
  },
  linkedCollections: [],
  publicCollectionCreation: false,
  collectionId: 0,
  lock: false,
  metadataId: undefined,
  recipient: "",
  addresses: [],
  collectionsIds: [],
  isBlacklist: false,
  permissionMsg: {},
}

const useMintModuleStore = create(
  combine<MintModuleStore, MintModuleActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setAdmin: (admin: string) => set((state) => ({ ...state, admin })),
    setCodeId: (codeId: number) => set((state) => ({ ...state, codeId })),
    setCollectionInfo: (collectionInfo: CollectionInfo) =>
      set((state) => ({ ...state, collectionInfo })),
    setCollectionConfig: (collectionConfig: CollectionConfig) =>
      set((state) => ({ ...state, collectionConfig })),
    setTokenInfo: (tokenInfo: TokenInfo) =>
      set((state) => ({ ...state, tokenInfo })),
    setMetadataInfo: (metadataInfo: MetadataInfo) =>
      set((state) => ({ ...state, metadataInfo })),
    setFundInfo: (fundInfo: CollectionFundInfo) =>
      set((state) => ({ ...state, fundInfo })),
    setLinkedCollections: (linkedCollections: string[]) =>
      set((state) => ({ ...state, linkedCollections })),
    setPublicCollectionCreation: (publicCollectionCreation: boolean) =>
      set((state) => ({ ...state, publicCollectionCreation })),
    setCollectionId: (collectionId: number) =>
      set((state) => ({ ...state, collectionId })),
    setLock: (lock: boolean) => set((state) => ({ ...state, lock })),
    setMetadataId: (metadataId: number) =>
      set((state) => ({ ...state, metadataId })),
    setRecipient: (recipient: string) =>
      set((state) => ({ ...state, recipient })),
    setAddresses: (addresses: string[]) =>
      set((state) => ({ ...state, addresses })),
    setCollectionIds: (collectionIds: number[]) =>
      set((state) => ({ ...state, collectionIds })),
    setIsBlacklist: (isBlacklist: boolean) =>
      set((state) => ({ ...state, isBlacklist })),
    setPermissionMsg: (permissionMsg: Record<string, unknown>) =>
      set((state) => ({ ...state, permissionMsg })),
  }))
)

export default useMintModuleStore
