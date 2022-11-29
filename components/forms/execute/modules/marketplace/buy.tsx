import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { Listing } from "komplejs/lib/cjs/types/ts-types/MarketplaceModule.types"
import { useMarketplaceModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MarketplaceModuleBuy = () => {
  const store = useMarketplaceModuleStore((state) => state)

  const listingTypeOnChange = (index: number) => {
    let value = (index === 0 ? "fixed" : "auction") as Listing
    store.setListingType(value)
  }

  return (
    <div>
      <Dropdown
        items={["fixed", "auction"]}
        title="Listing Type"
        onChange={listingTypeOnChange}
        placeholder="Select Listing Type"
        isRequired
      />
      <TextInput
        title="Collection ID"
        onChange={(value) =>
          store.setCollectionId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
      <TextInput
        title="Token ID"
        onChange={(value) =>
          store.setTokenId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.tokenId === 0 ? "" : store.tokenId.toString()}
      />
    </div>
  )
}
