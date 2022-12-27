import { InfoBoxProps } from "components/InfoBox"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface AppStore {
  loading: boolean
  responseInfoBoxList: InfoBoxProps[]
}

export interface AppActions {
  clear: () => void
  setLoading: (loading: boolean) => void
  setResponseInfoBoxList: (list: InfoBoxProps[]) => void
}

const initialState: AppStore = {
  loading: false,
  responseInfoBoxList: [],
}

const useAppStore = create(
  combine<AppStore, AppActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
    setResponseInfoBoxList: (list: InfoBoxProps[]) =>
      set((state) => ({ ...state, responseInfoBoxList: list })),
  }))
)

export default useAppStore
