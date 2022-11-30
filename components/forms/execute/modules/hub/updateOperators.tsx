import { TextInputList } from "components/TextInputList"
import { useHubModuleStore } from "store"

export const HubModuleUpdateOperators = () => {
  const store = useHubModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Contract Operators"
        subtitle="List of contract operators"
        placeholder="juno...."
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
