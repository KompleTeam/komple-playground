import { Listing } from "komplejs/lib/cjs/types/ts-types/MarketplaceModule.types"
import { CollectionFundInfo } from "komplejs/lib/cjs/types/ts-types/MintModule.types"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface MarketplaceModuleStore {
  admin: string
  fundInfo: CollectionFundInfo
  lock: boolean
  collectionId: number
  tokenId: number
  price: number
  listingType?: Listing
  buyer: string
  addresses: string[]
  startAfter?: number
  limit?: number
}

export interface MarketplaceModuleActions {
  clear: () => void
  setAdmin: (admin: string) => void
  setFundInfo: (fundInfo: CollectionFundInfo) => void
  setLock: (lock: boolean) => void
  setCollectionId: (collectionId: number) => void
  setTokenId: (tokenId: number) => void
  setPrice: (price: number) => void
  setListingType: (listingType: Listing) => void
  setBuyer: (buyer: string) => void
  setAddresses: (addresses: string[]) => void
  setStartAfter: (startAfter: number) => void
  setLimit: (limit: number) => void
}

const initialState: MarketplaceModuleStore = {
  admin: "",
  fundInfo: {
    is_native: true,
    denom: "",
    cw20_address: undefined,
  },
  lock: false,
  collectionId: 0,
  tokenId: 0,
  price: 0,
  listingType: undefined,
  buyer: "",
  addresses: [],
  startAfter: undefined,
  limit: undefined,
}

const useMarketplaceModuleStore = create(
  combine<MarketplaceModuleStore, MarketplaceModuleActions>(
    initialState,
    (set) => ({
      clear: () => set(initialState),
      setAdmin: (admin: string) => set((state) => ({ ...state, admin })),
      setFundInfo: (fundInfo: CollectionFundInfo) =>
        set((state) => ({ ...state, fundInfo })),
      setLock: (lock: boolean) => set((state) => ({ ...state, lock })),
      setCollectionId: (collectionId: number) =>
        set((state) => ({ ...state, collectionId })),
      setTokenId: (tokenId: number) => set((state) => ({ ...state, tokenId })),
      setPrice: (price: number) => set((state) => ({ ...state, price })),
      setListingType: (listingType: Listing) =>
        set((state) => ({ ...state, listingType })),
      setBuyer: (buyer: string) => set((state) => ({ ...state, buyer })),
      setAddresses: (addresses: string[]) =>
        set((state) => ({ ...state, addresses })),
      setStartAfter: (startAfter: number) =>
        set((state) => ({ ...state, startAfter })),
      setLimit: (limit: number) => set((state) => ({ ...state, limit })),
    })
  )
)

export default useMarketplaceModuleStore
