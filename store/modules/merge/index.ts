import { MergeBurnMsg } from "komplejs/lib/cjs/types/ts-types/MergeModule.types"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface MergeModuleStore {
  lock: boolean
  recipient: string
  mintId: number
  metadataId?: number
  burnIds: MergeBurnMsg[]
  permissionMsg: Record<string, unknown>
  addresses: string[]
}

export interface MergeModuleActions {
  clear: () => void
  setLock: (lock: boolean) => void
  setRecipient: (recipient: string) => void
  setMintId: (mintId: number) => void
  setMetadataId: (metadataId: number) => void
  setBurnIds: (burnIds: MergeBurnMsg[]) => void
  setPermissionMsg: (permissionMsg: Record<string, unknown>) => void
  setAddresses: (addresses: string[]) => void
}

const initialState: MergeModuleStore = {
  lock: false,
  recipient: "",
  mintId: 0,
  metadataId: undefined,
  burnIds: [],
  permissionMsg: {},
  addresses: [],
}

const useMergeModuleStore = create(
  combine<MergeModuleStore, MergeModuleActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setLock: (lock: boolean) => set((state) => ({ ...state, lock })),
    setRecipient: (recipient: string) =>
      set((state) => ({ ...state, recipient })),
    setMintId: (mintId: number) => set((state) => ({ ...state, mintId })),
    setMetadataId: (metadataId: number) =>
      set((state) => ({ ...state, metadataId })),

    setBurnIds: (burnIds: MergeBurnMsg[]) =>
      set((state) => ({ ...state, burnIds })),
    setPermissionMsg: (permissionMsg: Record<string, unknown>) =>
      set((state) => ({ ...state, permissionMsg })),
    setAddresses: (addresses: string[]) =>
      set((state) => ({ ...state, addresses })),
  }))
)

export default useMergeModuleStore
