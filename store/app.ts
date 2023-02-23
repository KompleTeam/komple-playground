import { InfoBoxProps } from "components/InfoBox"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface AppStore {
  currentChain: string
  loading: boolean
  showResponse: boolean
  responseInfoBoxList: InfoBoxProps[]
}

export interface AppActions {
  clear: () => void
  setCurrentChain: (chain: string) => void
  setLoading: (loading: boolean) => void
  setShowResponse: (show: boolean) => void
  setResponseInfoBoxList: (list: InfoBoxProps[]) => void
}

const initialState: AppStore = {
  currentChain: "junotestnet",
  loading: false,
  showResponse: false,
  responseInfoBoxList: [],
}

const useAppStore = create(
  combine<AppStore, AppActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setCurrentChain: (chain: string) =>
      set((state) => ({ ...state, currentChain: chain })),
    setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
    setShowResponse: (show: boolean) =>
      set((state) => ({ ...state, showResponse: show })),
    setResponseInfoBoxList: (list: InfoBoxProps[]) =>
      set((state) => ({ ...state, responseInfoBoxList: list })),
  }))
)

export default useAppStore
