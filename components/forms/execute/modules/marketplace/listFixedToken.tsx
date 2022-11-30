import { TextInput } from "components/TextInput"
import { useMarketplaceModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MarketplaceModuleListFixedToken = () => {
  const store = useMarketplaceModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Collection ID"
        subtitle="Collection ID of the NFT to list"
        placeholder="3"
        onChange={(value) =>
          store.setCollectionId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.collectionId === 0 ? "" : store.collectionId.toString()}
      />
      <TextInput
        title="Token ID"
        subtitle="Token ID of the NFT to list"
        placeholder="17"
        onChange={(value) =>
          store.setTokenId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.tokenId === 0 ? "" : store.tokenId.toString()}
      />
      <TextInput
        title="Listing Price"
        subtitle="Price to list the NFT for - $JUNO"
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
