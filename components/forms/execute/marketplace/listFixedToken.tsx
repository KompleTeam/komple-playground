import { TextInput } from "components/TextInput"
import useMarketplaceModuleStore from "store/modules/marketplace"
import { isInteger } from "utils/isInteger"

export const MarketplaceModuleListFixedToken = () => {
  const store = useMarketplaceModuleStore((state) => state)

  return (
    <div>
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
      <TextInput
        title="Price"
        onChange={(value) =>
          store.setPrice(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.price === 0 ? "" : store.price.toString()}
      />
    </div>
  )
}
