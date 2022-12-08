import {
  CollectionConfig,
  Locks,
} from "komplejs/lib/cjs/types/ts-types/TokenModule.types"
import { InstantiateMsg } from "komplejs/lib/cjs/types/ts-types/WhitelistModule.types"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface TokenModuleStore {
  admin: string
  recipient: string
  tokenId: string
  contract: string
  sendMsg: Record<string, unknown>
  metadataId?: number
  addresses: string[]
  locks: Locks
  collectionConfig: CollectionConfig
  codeId: number
  whitelistInstantiateMsg: InstantiateMsg
  startAfter?: string
  limit?: number
}

export interface TokenModuleActions {
  clear: () => void
  setAdmin: (admin: string) => void
  setRecipient: (recipient: string) => void
  setTokenId: (tokenId: string) => void
  setContract: (contract: string) => void
  setSendMsg: (sendMsg: Record<string, unknown>) => void
  setMetadataId: (metadataId: number) => void
  setAddresses: (addresses: string[]) => void
  setLocks: (locks: Locks) => void
  setCollectionConfig: (collectionConfig: CollectionConfig) => void
  setCodeId: (codeId: number) => void
  setWhitelistInstantiateMsg: (whitelistInstantiateMsg: InstantiateMsg) => void
  setStartAfter: (startAfter?: string) => void
  setLimit: (limit?: number) => void
}

const initialState: TokenModuleStore = {
  admin: "",
  recipient: "",
  tokenId: "",
  contract: "",
  sendMsg: {},
  metadataId: undefined,
  addresses: [],
  locks: {
    mint_lock: false,
    transfer_lock: false,
    burn_lock: false,
    send_lock: false,
  },
  collectionConfig: {
    per_address_limit: undefined,
    max_token_limit: undefined,
    ipfs_link: undefined,
    start_time: undefined,
  },
  codeId: 0,
  whitelistInstantiateMsg: {
    config: {
      start_time: "",
      end_time: "",
      member_limit: 0,
      per_address_limit: 0,
    },
    members: [],
  },
  startAfter: undefined,
  limit: undefined,
}

const useTokenModuleStore = create(
  combine<TokenModuleStore, TokenModuleActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setAdmin: (admin: string) => set((state) => ({ ...state, admin })),
    setRecipient: (recipient: string) =>
      set((state) => ({ ...state, recipient })),
    setTokenId: (tokenId: string) => set((state) => ({ ...state, tokenId })),
    setContract: (contract: string) => set((state) => ({ ...state, contract })),
    setSendMsg: (sendMsg: Record<string, unknown>) =>
      set((state) => ({ ...state, sendMsg })),
    setMetadataId: (metadataId: number) =>
      set((state) => ({ ...state, metadataId })),
    setAddresses: (addresses: string[]) =>
      set((state) => ({ ...state, addresses })),
    setLocks: (locks: Locks) => set((state) => ({ ...state, locks })),
    setCollectionConfig: (collectionConfig: CollectionConfig) =>
      set((state) => ({ ...state, collectionConfig })),
    setCodeId: (codeId: number) => set((state) => ({ ...state, codeId })),
    setWhitelistInstantiateMsg: (whitelistInstantiateMsg: InstantiateMsg) =>
      set((state) => ({ ...state, whitelistInstantiateMsg })),
    setStartAfter: (startAfter?: string) =>
      set((state) => ({ ...state, startAfter })),
    setLimit: (limit?: number) => set((state) => ({ ...state, limit })),
  }))
)

export default useTokenModuleStore
