import create from "zustand"
import { combine } from "zustand/middleware"

export interface AttributePermissionStore {
  data?: Record<string, unknown>
}

export interface AttributePermissionActions {
  clear: () => void
  setData: (data?: Record<string, unknown>) => void
}

const initialState: AttributePermissionStore = {
  data: undefined,
}

const useAttributePermissionStore = create(
  combine<AttributePermissionStore, AttributePermissionActions>(
    initialState,
    (set) => ({
      clear: () => set(initialState),
      setData: (data?: Record<string, unknown>) =>
        set((state) => ({ ...state, data })),
    })
  )
)

export default useAttributePermissionStore
