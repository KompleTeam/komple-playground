import { TextInput } from "components/TextInput"
import { useEffect, useState } from "react"

export type MintModuleQueryType =
  | ""
  | "config"
  | "collection_address"
  | "collection_info"
  | "operators"
  | "linked_collections"
  | "collections"
  | "creators"
  | "mint_lock"

export interface MintModuleQueryFormMsg {
  collectionId: string
  isBlacklist: boolean
  startAfter?: number
  limit?: number
}

export interface MintModuleQueryInterface {
  query: MintModuleQueryType
  onChange: (msg: MintModuleQueryFormMsg) => void
}

export const MintModuleQueryForm = ({
  query,
  onChange,
}: MintModuleQueryInterface) => {
  const [collectionId, setCollectionId] = useState("")
  const [isBlacklist, setIsBlacklist] = useState(false)
  const [startAfter, setStartAfter] = useState("")
  const [limit, setLimit] = useState("")

  useEffect(() => {
    onChange({
      collectionId,
      isBlacklist,
      startAfter: startAfter === "" ? undefined : parseInt(startAfter),
      limit: limit === "" ? undefined : parseInt(limit),
    })
  }, [onChange, collectionId, isBlacklist, startAfter, limit])

  return (
    <div>
      {(query === "collection_address" ||
        query === "collection_info" ||
        query === "linked_collections" ||
        query === "mint_lock") && (
        <TextInput
          title="Collection ID"
          onChange={setCollectionId}
          isRequired
        />
      )}

      {query === "collections" && (
        <>
          <TextInput title="Start After" onChange={setStartAfter} />
          <TextInput title="Limit" onChange={setLimit} />
        </>
      )}
    </div>
  )
}
