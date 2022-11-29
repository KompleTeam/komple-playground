import { TextInput } from "components/TextInput"
import { useHubModuleStore } from "store"

export const HubModuleUpdateHubInfo = () => {
  const store = useHubModuleStore((state) => state)

  return (
    <div>
      <TextInput
        title="Hub Name"
        onChange={(name) => store.setHubInfo({ ...store.hubInfo, name })}
        isRequired
        value={store.hubInfo.name}
      />
      <TextInput
        title="Hub Description"
        onChange={(description) =>
          store.setHubInfo({ ...store.hubInfo, description })
        }
        isRequired
        value={store.hubInfo.description}
      />
      <TextInput
        title="Hub Image"
        onChange={(image) => store.setHubInfo({ ...store.hubInfo, image })}
        isRequired
        value={store.hubInfo.image}
      />
      <TextInput
        title="External Link"
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
