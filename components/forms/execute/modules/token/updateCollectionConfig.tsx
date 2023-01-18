import { InputDateTime } from "components/InputDateTime"
import { TextInput } from "components/TextInput"
import { useTokenModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const TokenModuleUpdateCollectionConfig = () => {
  const store = useTokenModuleStore((state) => state)

  return (
    <div>
      <InputDateTime
        title="Minting Start Time"
        subtitle="The time when minting starts - DD/MM/YYYY"
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
        subtitle="The maximum number of tokens that can be minted per address"
        placeholder="10"
        onChange={(value) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            per_address_limit: isInteger(value) ? Number(value) : 0,
          })
        }
        value={
          store.collectionConfig.per_address_limit === 0
            ? ""
            : store.collectionConfig.per_address_limit?.toString()
        }
      />
      <TextInput
        title="Max Token Limit"
        subtitle="The maximum number of tokens that can be minted in total"
        placeholder="5000"
        onChange={(value) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            max_token_limit: isInteger(value) ? Number(value) : 0,
          })
        }
        value={
          store.collectionConfig.max_token_limit === 0
            ? ""
            : store.collectionConfig.max_token_limit?.toString()
        }
      />
      <TextInput
        title="IPFS Link"
        subtitle="The IPFS link of the collection"
        placeholder="ipfs://...."
        onChange={(value) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            ipfs_link: value,
          })
        }
        value={store.collectionConfig.ipfs_link?.toString()}
      />
    </div>
  )
}
