import create from "zustand"
import { combine } from "zustand/middleware"

export interface PermissionModuleStore {
  codeId: number
  permission: string
  msg?: string
  module: string
  permissions: string[]
  addresses: string[]
}

export interface PermissionModuleActions {
  clear: () => void
  setCodeId: (codeId: number) => void
  setPermission: (permission: string) => void
  setMsg: (msg?: string) => void
  setModule: (module: string) => void
  setPermissions: (permissions: string[]) => void
  setAddresses: (addresses: string[]) => void
}

const initialState: PermissionModuleStore = {
  codeId: 0,
  permission: "",
  msg: undefined,
  module: "",
  permissions: [],
  addresses: [],
}

const usePermissionModuleStore = create(
  combine<PermissionModuleStore, PermissionModuleActions>(
    initialState,
    (set) => ({
      clear: () => set(initialState),
      setCodeId: (codeId: number) => set((state) => ({ ...state, codeId })),
      setPermission: (permission: string) =>
        set((state) => ({ ...state, permission })),
      setMsg: (msg?: string) => set((state) => ({ ...state, msg })),
      setModule: (module: string) => set((state) => ({ ...state, module })),
      setPermissions: (permissions: string[]) =>
        set((state) => ({ ...state, permissions })),
      setAddresses: (addresses: string[]) =>
        set((state) => ({ ...state, addresses })),
    })
  )
)

export default usePermissionModuleStore
