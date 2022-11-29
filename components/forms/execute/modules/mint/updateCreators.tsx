import { TextInputList } from "components/TextInputList"
import useMintModuleStore from "store/modules/mint"

export const MintModuleUpdateCreators = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Creators"
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
