import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { KompleClient } from "komplejs"
import Head from "next/head"
import { useWallet } from "@cosmos-kit/react"
import { useAppStore, useMetadataModuleStore } from "store"
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
  const setLoading = useAppStore((state) => state.setLoading)

  const [executeMsg, setExecuteMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = EXECUTES[index]
    setExecuteMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      setLoading(true)

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

          setResponse(await executeClient.addMetadata(msg))
          break
        }
        case "update_metadata_info": {
          const msg = {
            rawMetadata: store.rawMetadata,
            id: store.id,
            metaInfo: store.metaInfo,
          }

          setResponse(await executeClient.updateMetaInfo(msg))
          break
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

          setResponse(await executeClient.addAttribute(msg))
          break
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

          setResponse(await executeClient.updateAttribute(msg))
          break
        }
        case "remove_attribute": {
          const msg = {
            rawMetadata: store.rawMetadata,
            id: store.id,
            traitType: store.traitType,
          }

          setResponse(await executeClient.removeAttribute(msg))
          break
        }
        case "link_metadata_to_NFT": {
          const msg = {
            tokenId: store.id,
            metadataId: store.metadataId === 0 ? undefined : store.metadataId,
          }

          setResponse(await executeClient.linkMetadata(msg))
          break
        }
        case "unlink_metadata_from_NFT": {
          const msg = {
            tokenId: store.id,
          }

          setResponse(await executeClient.unlinkMetadata(msg))
          break
        }
        case "update_contract_operators": {
          const msg = {
            addrs: store.addresses,
          }

          setResponse(await executeClient.updateOperators(msg))
          break
        }
      }

      setLoading(false)
    } catch (error: any) {
      setResponse(error.message)
      setLoading(false)
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
