import { InputDateTime } from "components/InputDateTime"
import { TextInput } from "components/TextInput"
import useTokenModuleStore from "store/modules/token"
import { isInteger } from "utils/isInteger"

export const TokenModuleUpdateCollectionConfig = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <InputDateTime
        title="Start Time"
        minDate={new Date()}
        onChange={(date: Date) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            start_time: date
              ? (date.getTime() * 1000000).toString()
              : undefined,
          })
        }
        value={
          store.collectionConfig.start_time
            ? new Date(Number(store.collectionConfig.start_time) / 1000000)
            : ""
        }
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
