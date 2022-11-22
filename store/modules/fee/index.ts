import { Fees } from "komplejs/lib/cjs/types/ts-types/FeeModule.types"
import { CustomPaymentAddress } from "komplejs/lib/cjs/types/ts-types/FeeModule.types"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface PaymentInfo {
  address?: string
  value: string
}

export interface FeeModuleStore {
  admin: string
  feeType?: Fees
  moduleName: string
  feeName: string
  paymentInfo: PaymentInfo
  customPaymentAddresses: CustomPaymentAddress[]
  startAfter?: string
  limit?: string
}

export interface FeeModuleActions {
  clear: () => void
  setAdmin: (admin: string) => void
  setFeeType: (feeType: Fees) => void
  setModuleName: (moduleName: string) => void
  setFeeName: (feeName: string) => void
  setPaymentInfo: (paymentInfo: PaymentInfo) => void
  setCustomPaymentAddresses: (
    customPaymentAddresses: CustomPaymentAddress[]
  ) => void
  setStartAfter: (startAfter: string) => void
  setLimit: (limit: string) => void
}

const initialState: FeeModuleStore = {
  admin: "",
  feeType: undefined,
  moduleName: "",
  feeName: "",
  paymentInfo: {
    address: undefined,
    value: "",
  },
  customPaymentAddresses: [],
  startAfter: undefined,
  limit: undefined,
}

const useFeeModuleStore = create(
  combine<FeeModuleStore, FeeModuleActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setAdmin: (admin: string) => set((state) => ({ ...state, admin })),
    setFeeType: (feeType: Fees) => set((state) => ({ ...state, feeType })),
    setModuleName: (moduleName: string) =>
      set((state) => ({ ...state, moduleName })),
    setFeeName: (feeName: string) => set((state) => ({ ...state, feeName })),
    setPaymentInfo: (paymentInfo: PaymentInfo) =>
      set((state) => ({ ...state, paymentInfo })),
    setCustomPaymentAddresses: (
      customPaymentAddresses: CustomPaymentAddress[]
    ) => set((state) => ({ ...state, customPaymentAddresses })),
    setStartAfter: (startAfter: string) =>
      set((state) => ({ ...state, startAfter })),
    setLimit: (limit: string) => set((state) => ({ ...state, limit })),
  }))
)

export default useFeeModuleStore
