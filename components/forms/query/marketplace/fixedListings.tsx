import { TextInput } from "components/TextInput"
import useMarketplaceModuleStore from "store/modules/marketplace"
import { isInteger } from "utils/isInteger"

export const MarketplaceModuleFixedListings = () => {
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
        title="Start After"
        onChange={(value) =>
          store.setStartAfter(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.startAfter === 0 ? "" : store.startAfter?.toString()}
      />
      <TextInput
        title="Limit"
        onChange={(value) =>
          store.setLimit(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.limit === 0 ? "" : store.limit?.toString()}
      />
    </div>
  )
}
