import { Seperator } from "components/Seperator"
import { TextInput } from "components/TextInput"
import { useMetadataModuleStore } from "store"

export const MetadataModuleUpdateMetaInfo = () => {
  const store = useMetadataModuleStore((state) => state)

  return (
    <div>
      <Seperator text="Meta Info" />
      <TextInput
        title="Description"
        onChange={(description) =>
          store.setMetaInfo({ ...store.metaInfo, description })
        }
        value={store.metaInfo.description?.toString()}
      />
      <TextInput
        title="Image"
        onChange={(image) => store.setMetaInfo({ ...store.metaInfo, image })}
        value={store.metaInfo.image?.toString()}
      />
      <TextInput
        title="External URL"
        onChange={(external_url) =>
          store.setMetaInfo({ ...store.metaInfo, external_url })
        }
        value={store.metaInfo.external_url?.toString()}
      />
      <TextInput
        title="Animation URL"
        onChange={(animation_url) =>
          store.setMetaInfo({ ...store.metaInfo, animation_url })
        }
        value={store.metaInfo.animation_url?.toString()}
      />
      <TextInput
        title="Youtube URL"
        onChange={(youtube_url) =>
          store.setMetaInfo({ ...store.metaInfo, youtube_url })
        }
        value={store.metaInfo.youtube_url?.toString()}
      />
    </div>
  )
}
