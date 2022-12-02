import { useState } from "react"
import { ContractHeader } from "components/contracts/ContractHeader"
import { TextInput } from "components/TextInput"
import { useWallet } from "@cosmos-kit/react"
import { ContractForm } from "components/contracts/ContractLayout"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { KompleClient } from "komplejs"
import { useHubModuleStore, useAppStore } from "store"

export default function HubModuleCreate() {
  const { getSigningCosmWasmClient, offlineSigner, address } = useWallet()

  const store = useHubModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)

  const [response, setResponse] = useState({})

  const submit = async ({ codeId }: { codeId: number }) => {
    try {
      setLoading(true)

      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("No signing client")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const hubModule = await kompleClient.hubModule("")

      const res = await hubModule.instantiate({
        codeId,
        admin: store.admin || address,
        hubInfo: store.hubInfo,
        // marbuFeeModule: store.marbuFeeModule,
      })
      setResponse(res)

      setLoading(false)
    } catch (error: any) {
      setResponse(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Hub Module | Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Hub Module | Komple Framework Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Hub Module"
        description="Hub module is the centre piece of the Komple Framework."
        documentation={DOC_LINKS.modules.hub}
      />
      <ContractForm
        name="Hub"
        isModule={true}
        response={response}
        action="create"
        submit={submit}
      >
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
          value={store.hubInfo.external_link?.toString()}
        />
        {/* <TextInput
          title="Marbu Fee Module"
          subtitle="Marbu Fee Module address"
          placeholder="juno...."
          onChange={(value) =>
            store.setMarbuFeeModule(value === "" ? undefined : value)
          }
        /> */}
      </ContractForm>
    </div>
  )
}
