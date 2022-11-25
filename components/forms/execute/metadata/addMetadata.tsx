import { Seperator } from "components/Seperator"
import { TextInput } from "components/TextInput"
import { TextMultiInputList } from "components/TextMultiInputList"
import useMetadataModuleStore from "store/modules/metadata"

export const MetadataModuleAddMetadata = () => {
  const store = useMetadataModuleStore((state) => state)

  const attributeOnChange = (value: Record<string, string>[]) => {
    store.setAttributes(
      value.map((item) => {
        return { trait_type: item.left, value: item.right }
      })
    )
  }

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
      <Seperator text="Attributes" />
      <TextMultiInputList
        onChange={attributeOnChange}
        titles={["Trait Type", "Trait Value"]}
      />
    </div>
  )
}
