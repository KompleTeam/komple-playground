import { TextInput } from "components/TextInput"
import { useHubModuleStore } from "store"

export const HubModuleUpdateHubInfo = () => {
  const store = useHubModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Hub Name"
        subtitle="Name of the project"
        placeholder="My awesome project"
        onChange={(name) => store.setHubInfo({ ...store.hubInfo, name })}
        isRequired
        value={store.hubInfo.name}
      />
      <TextInput
        title="Hub Description"
        subtitle="Description of the project"
        placeholder="My awesome project is awesome"
        onChange={(description) =>
          store.setHubInfo({ ...store.hubInfo, description })
        }
        isRequired
        value={store.hubInfo.description}
      />
      <TextInput
        title="Hub Image"
        subtitle="Image of the project"
        placeholder="https://my-awesome-project.com/image.png"
        onChange={(image) => store.setHubInfo({ ...store.hubInfo, image })}
        isRequired
        value={store.hubInfo.image}
      />
      <TextInput
        title="External Link"
        subtitle="Link to the project"
        placeholder="https://my-awesome-project.com"
        onChange={(external_link) =>
          store.setHubInfo({
            ...store.hubInfo,
            external_link: external_link === "" ? undefined : external_link,
          })
        }
        isRequired
        value={store.hubInfo.external_link?.toString()}
      />
    </div>
  )
}
