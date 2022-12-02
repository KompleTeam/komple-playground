import create from "zustand"
import { combine } from "zustand/middleware"

export interface AppStore {
  loading: boolean
}

export interface AppActions {
  clear: () => void
  setLoading: (loading: boolean) => void
}

const initialState: AppStore = {
  loading: false,
}

const useAppStore = create(
  combine<AppStore, AppActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
  }))
)

export default useAppStore
