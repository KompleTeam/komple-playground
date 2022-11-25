import {
  Metadata,
  MetaInfo,
  Trait,
} from "komplejs/lib/cjs/types/ts-types/MetadataModule.types"
import create from "zustand"
import { combine } from "zustand/middleware"

export interface MetadataModuleStore {
  admin: string
  metadataType?: Metadata
  metaInfo: MetaInfo
  attributes: Trait[]
  id: number
  metadataId?: number
  rawMetadata: boolean
  traitType: string
  traitValue: string
  addresses: string[]
  startAfter?: number
  limit?: number
}

export interface MetadataModuleActions {
  clear: () => void
  setAdmin: (admin: string) => void
  setMetadataType: (metadataType: Metadata) => void
  setMetaInfo: (metaInfo: MetaInfo) => void
  setAttributes: (attributes: Trait[]) => void
  setId: (id: number) => void
  setMetadataId: (metadataId: number) => void
  setRawMetadata: (rawMetadata: boolean) => void
  setTraitType: (traitType: string) => void
  setTraitValue: (traitValue: string) => void
  setAddresses: (addresses: string[]) => void
  setStartAfter: (startAfter: number) => void
  setLimit: (limit: number) => void
}

const initialState: MetadataModuleStore = {
  admin: "",
  metadataType: undefined,
  metaInfo: {
    animation_url: undefined,
    description: undefined,
    external_url: undefined,
    image: undefined,
    youtube_url: undefined,
  },
  attributes: [],
  id: 0,
  metadataId: undefined,
  rawMetadata: false,
  traitType: "",
  traitValue: "",
  addresses: [],
  startAfter: undefined,
  limit: undefined,
}

const useMetadataModuleStore = create(
  combine<MetadataModuleStore, MetadataModuleActions>(initialState, (set) => ({
    clear: () => set(initialState),
    setAdmin: (admin: string) => set((state) => ({ ...state, admin })),
    setMetadataType: (metadataType: Metadata) =>
      set((state) => ({ ...state, metadataType })),
    setMetaInfo: (metaInfo: MetaInfo) =>
      set((state) => ({ ...state, metaInfo })),
    setAttributes: (attributes: Trait[]) =>
      set((state) => ({ ...state, attributes })),
    setId: (id: number) => set((state) => ({ ...state, id })),
    setMetadataId: (metadataId: number) =>
      set((state) => ({ ...state, metadataId })),
    setRawMetadata: (rawMetadata: boolean) =>
      set((state) => ({ ...state, rawMetadata })),
    setTraitType: (traitType: string) =>
      set((state) => ({ ...state, traitType })),
    setTraitValue: (traitValue: string) =>
      set((state) => ({ ...state, traitValue })),
    setAddresses: (addresses: string[]) =>
      set((state) => ({ ...state, addresses })),
    setStartAfter: (startAfter: number) =>
      set((state) => ({ ...state, startAfter })),
    setLimit: (limit: number) => set((state) => ({ ...state, limit })),
  }))
)

export default useMetadataModuleStore
