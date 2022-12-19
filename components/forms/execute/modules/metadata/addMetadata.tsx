import { Seperator } from "components/Seperator"
import { TextInput } from "components/TextInput"
import { TextMultiInputList } from "components/TextMultiInputList"
import { useMetadataModuleStore } from "store"

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
      <Seperator text="Metadata Info" />
      <TextInput
        title="Description"
        subtitle="Description of the NFT"
        placeholder="My new NFT"
        onChange={(description) =>
          store.setMetaInfo({ ...store.metaInfo, description })
        }
        value={store.metaInfo.description?.toString()}
      />
      <TextInput
        title="Image"
        subtitle="Image of the NFT"
        placeholder="https://my-new-nft.com/image.png"
        onChange={(image) => store.setMetaInfo({ ...store.metaInfo, image })}
        value={store.metaInfo.image?.toString()}
      />
      <TextInput
        title="External URL"
        subtitle="Link to the NFT"
        placeholder="https://my-new-nft.com"
        onChange={(external_url) =>
          store.setMetaInfo({ ...store.metaInfo, external_url })
        }
        value={store.metaInfo.external_url?.toString()}
      />
      <TextInput
        title="Animation URL"
        subtitle="Link to the animation of the NFT"
        placeholder="https://my-new-nft.com/animation.mp4"
        onChange={(animation_url) =>
          store.setMetaInfo({ ...store.metaInfo, animation_url })
        }
        value={store.metaInfo.animation_url?.toString()}
      />
      <TextInput
        title="Youtube URL"
        subtitle="Link to the youtube video of the NFT"
        placeholder="https://www.youtube.com"
        onChange={(youtube_url) =>
          store.setMetaInfo({ ...store.metaInfo, youtube_url })
        }
        value={store.metaInfo.youtube_url?.toString()}
      />
      <Seperator text="Attributes" />
      <TextMultiInputList
        onChange={attributeOnChange}
        titles={["Attribute Name", "Attribute Value"]}
        placeholder={["eye_color", "red"]}
      />
    </div>
  )
}
