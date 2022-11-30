import { TextInput } from "components/TextInput"
import { useMetadataModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MetadataModuleRawMetadatas = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Pagination - Start After"
        subtitle="ID to start after - exclusive"
        placeholder="6"
        onChange={(value) =>
          store.setStartAfter(isInteger(value) ? Number(value) : 0)
        }
        value={store.startAfter === 0 ? "" : store.startAfter?.toString()}
      />
      <TextInput
        title="Pagination - Limit"
        subtitle="Maximum number of metadatas to return"
        placeholder="20"
        onChange={(value) =>
          store.setLimit(isInteger(value) ? Number(value) : 0)
        }
        value={store.limit === 0 ? "" : store.limit?.toString()}
      />
    </div>
  )
}
