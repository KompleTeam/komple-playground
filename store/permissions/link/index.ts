import create from "zustand"
import { combine } from "zustand/middleware"

export interface LinkPermissionStore {
  data?: Record<string, unknown>
}

export interface LinkPermissionActions {
  clear: () => void
  setData: (data?: Record<string, unknown>) => void
}

const initialState: LinkPermissionStore = {
  data: undefined,
}

const useLinkPermissionStore = create(
  combine<LinkPermissionStore, LinkPermissionActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setData: (data?: Record<string, unknown>) =>
      set((state) => ({ ...state, data })),
  }))
)

export default useLinkPermissionStore
