import { Dropdown } from "components/Dropdown"
import { InputDateTime } from "components/InputDateTime"
import { Seperator } from "components/Seperator"
import { Switch } from "components/Switch"
import { TextInput } from "components/TextInput"
import { TextInputList } from "components/TextInputList"
import {
  Collections,
  Metadata,
} from "komplejs/lib/cjs/types/ts-types/MintModule.types"
import { useMintModuleStore } from "store"
import { isInteger } from "utils/isInteger"

export const MintModuleCreateCollection = () => {
  const store = useMintModuleStore((state) => state)

  const collectionTypeOnChange = (index: number) => {
    let value = (index === 0 ? "standard" : "komple") as Collections
    store.setCollectionInfo({ ...store.collectionInfo, collection_type: value })
  }

  const metadataTypeOnChange = (index: number) => {
    let value: Metadata = "standard"
    switch (index) {
      case 0:
        value = "standard"
        break
      case 1:
        value = "shared"
        break
      case 2:
        value = "dynamic"
        break
    }
    store.setMetadataInfo({
      ...store.metadataInfo,
      instantiate_msg: {
        ...store.metadataInfo.instantiate_msg,
        metadata_type: value,
      },
    })
  }

  return (
    <div>
      <Seperator text="Token Module" />
      <TextInput
        title="Token Module Code ID"
        subtitle="The code ID of the Token Module"
        placeholder="50"
        onChange={(value) =>
          store.setCodeId(isInteger(value) ? Number(value) : 0)
        }
        isRequired
        value={store.codeId === 0 ? "" : store.codeId.toString()}
      />

      <Seperator text="Collection Info" />
      <Dropdown
        items={["standard", "komple"]}
        title="Collection Type"
        onChange={collectionTypeOnChange}
        placeholder="Select Collection Type"
        isRequired
      />
      <TextInput
        title="Collection Name"
        subtitle="The name of the collection"
        placeholder="My new collection"
        onChange={(name) =>
          store.setCollectionInfo({ ...store.collectionInfo, name })
        }
        isRequired
        value={store.collectionInfo.name}
      />
      <TextInput
        title="Collection Description"
        subtitle="The description of the collection"
        placeholder="My new collection is new"
        onChange={(description) =>
          store.setCollectionInfo({ ...store.collectionInfo, description })
        }
        isRequired
        value={store.collectionInfo.description}
      />
      <TextInput
        title="Collection Image"
        subtitle="The image of the collection"
        placeholder="https://my-new-collection.com/image.png"
        onChange={(image) =>
          store.setCollectionInfo({ ...store.collectionInfo, image })
        }
        isRequired
        value={store.collectionInfo.image}
      />
      <TextInput
        title="Collection External Link"
        subtitle="The external link to the collection"
        placeholder="https://my-new-collection.com"
        onChange={(external_link) =>
          store.setCollectionInfo({ ...store.collectionInfo, external_link })
        }
        value={store.collectionInfo.external_link?.toString()}
      />

      <Seperator text="Collection Config" />
      <TextInput
        title="Tokens Per Address Limit"
        subtitle="The maximum number of tokens that can be minted per address"
        placeholder="10"
        onChange={(value) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            per_address_limit: isInteger(value) ? Number(value) : 0,
          })
        }
        value={
          store.collectionConfig.per_address_limit === 0
            ? ""
            : store.collectionConfig.per_address_limit?.toString()
        }
      />
      <InputDateTime
        title="Minting Start Time"
        subtitle="The time when minting starts - DD/MM/YYYY"
        minDate={new Date()}
        onChange={(date: Date) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            start_time: date
              ? (date.getTime() * 1000000).toString()
              : undefined,
          })
        }
        value={
          store.collectionConfig.start_time
            ? new Date(Number(store.collectionConfig.start_time) / 1000000)
            : ""
        }
      />
      <TextInput
        title="Max Token Limit"
        subtitle="The maximum number of tokens that can be minted in total"
        placeholder="5000"
        onChange={(value) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            max_token_limit: isInteger(value) ? Number(value) : 0,
          })
        }
        value={
          store.collectionConfig.max_token_limit === 0
            ? ""
            : store.collectionConfig.max_token_limit?.toString()
        }
      />
      <TextInput
        title="IPFS Link"
        subtitle="The IPFS link of the collection"
        placeholder="ipfs://...."
        onChange={(ipfs_link) =>
          store.setCollectionConfig({
            ...store.collectionConfig,
            ipfs_link,
          })
        }
        value={store.collectionConfig.ipfs_link?.toString()}
      />

      {/* <Seperator text="Token Info" />
      <TextInput
        title="Symbol"
        subtitle="The symbol of the collection"
        placeholder="new"
        onChange={(symbol) =>
          store.setTokenInfo({
            ...store.tokenInfo,
            symbol,
          })
        }
        isRequired
        value={store.tokenInfo.symbol}
      />
      <TextInput
        title="Minter"
        subtitle="The minter of the collection"
        isRequired
        onChange={(minter) =>
          store.setTokenInfo({
            ...store.tokenInfo,
            minter,
          })
        }
        value={store.tokenInfo.minter}
      /> */}

      <Seperator text="Metadata Info" />
      <TextInput
        title="Metadata Module Code ID"
        subtitle="The code ID of the Metadata Module"
        placeholder="50"
        onChange={(value) =>
          store.setMetadataInfo({
            ...store.metadataInfo,
            code_id: isInteger(value) ? Number(value) : 0,
          })
        }
        isRequired
        value={
          store.metadataInfo.code_id === 0
            ? ""
            : store.metadataInfo.code_id.toString()
        }
      />
      <Dropdown
        items={["standard", "shared", "dynamic"]}
        title="Metadata Type"
        onChange={metadataTypeOnChange}
        placeholder="Select Metadata Type"
        isRequired
      />

      <Seperator text="Minting Currency Info" />
      <Switch
        title="Native Token"
        subtitle="Select native or cw20 tokens"
        onChange={(is_native) =>
          store.setFundInfo({ ...store.fundInfo, is_native })
        }
        initialState={store.fundInfo.is_native}
      />
      <TextInput
        title={`${store.fundInfo.is_native ? "Native" : "CW20"} Token Denom`}
        subtitle="The denom of the token"
        placeholder={store.fundInfo.is_native ? "ujunox" : "utoken"}
        onChange={(denom) => store.setFundInfo({ ...store.fundInfo, denom })}
        isRequired
        value={store.fundInfo.denom}
      />
      {!store.fundInfo.is_native && (
        <TextInput
          title="CW20 Token Address"
          subtitle="The address of the cw20 token contract"
          placeholder="juno...."
          onChange={(cw20_address) =>
            store.setFundInfo({ ...store.fundInfo, cw20_address })
          }
          value={store.fundInfo.cw20_address?.toString()}
          isRequired
        />
      )}

      <Seperator text="Collections" />
      <TextInputList
        title="Linked Collection IDs"
        subtitle="The IDs of the collections that are linked to this collection"
        placeholder="6"
        onChange={store.setLinkedCollections}
      />
    </div>
  )
}
