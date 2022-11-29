import { WhitelistConfig } from "komplejs/lib/cjs/types/ts-types/WhitelistModule.types"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface WhitelistModuleStore {
  members: string[]
  config: WhitelistConfig
  startAfter?: string
  limit?: number
  member: string
}

export interface WhitelistModuleActions {
  clear: () => void
  setMembers: (members: string[]) => void
  setConfig: (config: WhitelistConfig) => void
  setStartAfter: (startAfter: string) => void
  setLimit: (limit: number) => void
  setMember: (member: string) => void
}

const initialState: WhitelistModuleStore = {
  members: [],
  config: {
    start_time: "",
    end_time: "",
    per_address_limit: 0,
    member_limit: 0,
  },
  startAfter: undefined,
  limit: undefined,
  member: "",
}

const useWhitelistModuleStore = create(
  combine<WhitelistModuleStore, WhitelistModuleActions>(
    initialState,
    (set) => ({
      clear: () => set(initialState),
      setAdmin: (admin: string) => set((state) => ({ ...state, admin })),
      setMembers: (members: string[]) =>
        set((state) => ({ ...state, members })),
      setConfig: (config: WhitelistConfig) =>
        set((state) => ({ ...state, config })),
      setStartAfter: (startAfter: string) =>
        set((state) => ({ ...state, startAfter })),
      setLimit: (limit: number) => set((state) => ({ ...state, limit })),
      setMember: (member: string) => set((state) => ({ ...state, member })),
    })
  )
)

export default useWhitelistModuleStore
