import { Listing } from "komplejs/lib/cjs/types/ts-types/MarketplaceModule.types"
import { CollectionFundInfo } from "komplejs/lib/cjs/types/ts-types/MintModule.types"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface MintModuleStore {
  admin: string
  fundInfo: CollectionFundInfo
  lock: boolean
  collectionId: number
  tokenId: number
  price: string
  listingType?: Listing
  buyer: string
  addresses: string[]
}

export interface MintModuleActions {
  clear: () => void
  setAdmin: (admin: string) => void
  setFundInfo: (fundInfo: CollectionFundInfo) => void
  setLock: (lock: boolean) => void
  setCollectionId: (collectionId: number) => void
  setTokenId: (tokenId: number) => void
  setPrice: (price: string) => void
  setListingType: (listingType: Listing) => void
  setBuyer: (buyer: string) => void
  setAddresses: (addresses: string[]) => void
}

const initialState: MintModuleStore = {
  admin: "",
  fundInfo: {
    is_native: false,
    denom: "",
    cw20_address: undefined,
  },
  lock: false,
  collectionId: 0,
  tokenId: 0,
  price: "",
  listingType: undefined,
  buyer: "",
  addresses: [],
}

const useMintModuleStore = create(
  combine<MintModuleStore, MintModuleActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setAdmin: (admin: string) => set((state) => ({ ...state, admin })),
    setFundInfo: (fundInfo: CollectionFundInfo) =>
      set((state) => ({ ...state, fundInfo })),
    setLock: (lock: boolean) => set((state) => ({ ...state, lock })),
    setCollectionId: (collectionId: number) =>
      set((state) => ({ ...state, collectionId })),
    setTokenId: (tokenId: number) => set((state) => ({ ...state, tokenId })),
    setPrice: (price: string) => set((state) => ({ ...state, price })),
    setListingType: (listingType: Listing) =>
      set((state) => ({ ...state, listingType })),
    setBuyer: (buyer: string) => set((state) => ({ ...state, buyer })),
    setAddresses: (addresses: string[]) =>
      set((state) => ({ ...state, addresses })),
  }))
)

export default useMintModuleStore
