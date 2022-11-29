import { TextInput } from "components/TextInput"
import { useMetadataModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MetadataModuleRawMetadatas = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Start After"
        onChange={(value) =>
          store.setStartAfter(isInteger(value) ? Number(value) : 0)
        }
        value={store.startAfter === 0 ? "" : store.startAfter?.toString()}
      />
      <TextInput
        title="Limit"
        onChange={(value) =>
          store.setLimit(isInteger(value) ? Number(value) : 0)
        }
        value={store.limit === 0 ? "" : store.limit?.toString()}
      />
    </div>
  )
}
