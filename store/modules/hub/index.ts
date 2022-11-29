import { HubInfo } from "komplejs/lib/cjs/types/ts-types/HubModule.types"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface HubModuleStore {
  admin: string
  hubInfo: HubInfo
  marbuFeeModule?: string
  codeId: number
  module: string
  msg?: Record<string, unknown>
  addresses: string[]
  contractAddress: string
}

export interface HubModuleActions {
  clear: () => void
  setAdmin: (admin: string) => void
  setHubInfo: (hubInfo: HubInfo) => void
  setMarbuFeeModule: (marbuFeeModule?: string) => void
  setCodeId: (codeId: number) => void
  setModule: (module: string) => void
  setMsg: (msg?: Record<string, unknown>) => void
  setAddresses: (addresses: string[]) => void
  setContractAddress: (contractAddress: string) => void
}

const initialState: HubModuleStore = {
  admin: "",
  hubInfo: {
    name: "",
    description: "",
    image: "",
    external_link: undefined,
  },
  marbuFeeModule: undefined,
  codeId: 0,
  module: "",
  msg: undefined,
  addresses: [],
  contractAddress: "",
}

const useHubModuleStore = create(
  combine<HubModuleStore, HubModuleActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setAdmin: (admin: string) => set((state) => ({ ...state, admin })),
    setHubInfo: (hubInfo: HubInfo) => set((state) => ({ ...state, hubInfo })),
    setMarbuFeeModule: (marbuFeeModule?: string) =>
      set((state) => ({ ...state, marbuFeeModule })),
    setCodeId: (codeId: number) => set((state) => ({ ...state, codeId })),
    setModule: (module: string) => set((state) => ({ ...state, module })),
    setMsg: (msg?: Record<string, unknown>) =>
      set((state) => ({ ...state, msg })),
    setAddresses: (addresses: string[]) =>
      set((state) => ({ ...state, addresses })),
    setContractAddress: (contractAddress: string) =>
      set((state) => ({ ...state, contractAddress })),
  }))
)

export default useHubModuleStore
