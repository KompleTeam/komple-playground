import create from "zustand"
import { combine } from "zustand/middleware"

export interface OwnershipPermissionStore {
  data?: Record<string, unknown>
}

export interface OwnershipPermissionActions {
  clear: () => void
  setData: (data?: Record<string, unknown>) => void
}

const initialState: OwnershipPermissionStore = {
  data: undefined,
}

const useOwnershipPermissionStore = create(
  combine<OwnershipPermissionStore, OwnershipPermissionActions>(
    initialState,
    (set) => ({
      clear: () => set(initialState),
      setData: (data?: Record<string, unknown>) =>
        set((state) => ({ ...state, data })),
    })
  )
)

export default useOwnershipPermissionStore
