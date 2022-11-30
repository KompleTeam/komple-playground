import { TextInputList } from "components/TextInputList"
import { useMintModuleStore } from "store"

export const MintModuleUpdateCreators = () => {
  const store = useMintModuleStore((state) => state)

  return (
    <div>
      <TextInputList
        title="Colllection Creators"
        subtitle="List of collection creator addresses"
        placeholder="juno...."
        onChange={(value) => store.setAddresses(value)}
        value={store.addresses}
      />
    </div>
  )
}
