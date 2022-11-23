import { TextInput } from "components/TextInput"
import useTokenModuleStore from "store/modules/token"
import { isInteger } from "utils/isInteger"

export const TokenModuleUpdateCollectionConfig = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Start Time"
        onChange={(value) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            start_time: value,
          })
        }
        isRequired
        value={store.collectionConfig.start_time?.toString()}
      />
      <TextInput
        title="Tokens Per Address Limit"
        onChange={(value) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            per_address_limit: isInteger(value) ? Number(value) : 0,
          })
        }
        isRequired
        value={
          store.collectionConfig.per_address_limit === 0
            ? ""
            : store.collectionConfig.per_address_limit?.toString()
        }
      />
      <TextInput
        title="Maximum Token Limit"
        onChange={(value) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            max_token_limit: isInteger(value) ? Number(value) : 0,
          })
        }
        isRequired
        value={
          store.collectionConfig.max_token_limit === 0
            ? ""
            : store.collectionConfig.max_token_limit?.toString()
        }
      />
      <TextInput
        title="IPFS Link"
        onChange={(value) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            ipfs_link: value,
          })
        }
        isRequired
        value={store.collectionConfig.ipfs_link?.toString()}
      />
    </div>
  )
}
