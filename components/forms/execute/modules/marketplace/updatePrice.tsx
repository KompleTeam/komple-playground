import { Dropdown } from "components/Dropdown"
import { TextInput } from "components/TextInput"
import { Listing } from "komplejs/lib/cjs/types/ts-types/MarketplaceModule.types"
import { useMarketplaceModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MarketplaceModuleUpdatePrice = () => {
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
        subtitle="Collection ID of the listed NFT"
        placeholder="3"
        onChange={(value) =>
          store.setCollectionId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
      <TextInput
        title="Token ID"
        subtitle="Token ID of the listed NFT"
        placeholder="17"
        onChange={(value) =>
          store.setTokenId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.tokenId === 0 ? "" : store.tokenId.toString()}
      />
      <TextInput
        title="New Listing Price"
        subtitle="New price to list the NFT for - $JUNO"
        placeholder="35"
        onChange={(value) =>
          store.setPrice(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.price === 0 ? "" : store.price.toString()}
      />
    </div>
  )
}
