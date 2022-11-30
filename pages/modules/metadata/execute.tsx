import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import { useMetadataModuleStore } from "store"
import {
  MetadataModuleAddAttribute,
  MetadataModuleAddMetadata,
  MetadataModuleLinkMetadata,
  MetadataModuleRemoveAttribute,
  MetadataModuleUnlinkMetadata,
  MetadataModuleUpdateAttribute,
  MetadataModuleUpdateMetaInfo,
  MetadataModuleUpdateOperators,
} from "components/forms/execute"

const EXECUTES = [
  "add_metadata",
  "update_metadata_info",
  "add_attribute",
  "update_attribute",
  "remove_attribute",
  "link_metadata_to_NFT",
  "unlink_metadata_from_NFT",
  "update_contract_operators",
]

export default function MetadataModuleExecute() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useMetadataModuleStore((state) => state)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const metadataModule = await kompleClient.metadataModule(contract)
      const executeClient = metadataModule.client

      switch (executeMsg) {
        case "add_metadata": {
          const msg = {
            metaInfo: store.metaInfo,
            attributes: store.attributes,
          }

          return setResponse(await executeClient.addMetadata(msg))
        }
        case "update_metadata_info": {
          const msg = {
            rawMetadata: store.rawMetadata,
            id: store.id,
            metaInfo: store.metaInfo,
          }

          return setResponse(await executeClient.updateMetaInfo(msg))
        }
        case "add_attribute": {
          const msg = {
            rawMetadata: store.rawMetadata,
            id: store.id,
            attribute: {
              trait_type: store.traitType,
              value: store.traitValue,
            },
          }

          return setResponse(await executeClient.addAttribute(msg))
        }
        case "update_attribute": {
          const msg = {
            rawMetadata: store.rawMetadata,
            id: store.id,
            attribute: {
              trait_type: store.traitType,
              value: store.traitValue,
            },
          }

          return setResponse(await executeClient.updateAttribute(msg))
        }
        case "remove_attribute": {
          const msg = {
            rawMetadata: store.rawMetadata,
            id: store.id,
            traitType: store.traitType,
          }

          return setResponse(await executeClient.removeAttribute(msg))
        }
        case "link_metadata_to_NFT": {
          const msg = {
            tokenId: store.id,
            metadataId: store.metadataId === 0 ? undefined : store.metadataId,
          }

          return setResponse(await executeClient.linkMetadata(msg))
        }
        case "unlink_metadata_from_NFT": {
          const msg = {
            tokenId: store.id,
          }

          return setResponse(await executeClient.unlinkMetadata(msg))
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          return setResponse(await executeClient.updateOperators(msg))
        }
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Metadata Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Metadata Module | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Metadata Module"
        description="Metadata Module is used for keeping metadata information of a collection."
        documentation={DOC_LINKS.modules.metadata}
      />
      <ContractForm
        name="Metadata"
        isModule={true}
        response={response}
        action="execute"
        submit={submit}
        hidden={["create"]}
      >
        <Dropdown
          items={EXECUTES}
          title="Select Execute Messages"
          onChange={dropdownOnChange}
          placeholder="Select execute message"
        />

        {executeMsg === "add_metadata" && <MetadataModuleAddMetadata />}
        {executeMsg === "update_metadata_info" && (
          <MetadataModuleUpdateMetaInfo />
        )}
        {executeMsg === "add_attribute" && <MetadataModuleAddAttribute />}
        {executeMsg === "update_attribute" && <MetadataModuleUpdateAttribute />}
        {executeMsg === "remove_attribute" && <MetadataModuleRemoveAttribute />}
        {executeMsg === "link_metadata_to_NFT" && (
          <MetadataModuleLinkMetadata />
        )}
        {executeMsg === "unlink_metadata_from_NFT" && (
          <MetadataModuleUnlinkMetadata />
        )}
        {executeMsg === "update_contract_operators" && (
          <MetadataModuleUpdateOperators />
        )}
      </ContractForm>
    </div>
  )
}
