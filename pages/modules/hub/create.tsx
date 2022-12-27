import { useEffect, useState } from "react"
import { ContractHeader } from "components/contracts/ContractHeader"
import { TextInput } from "components/TextInput"
import { useWallet } from "@cosmos-kit/react"
import { ContractForm } from "components/contracts/ContractLayout"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { useHubModuleStore, useAppStore } from "store"
import { MARBU_CONTROLLER_ADDRESS } from "config/marbu"

export default function HubModuleCreate() {
  const { getSigningCosmWasmClient, address } = useWallet()

  const store = useHubModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)
  const setResponseInfoBoxList = useAppStore(
    (state) => state.setResponseInfoBoxList
  )
  const setShowResponse = useAppStore((state) => state.setShowResponse)

  const [response, setResponse] = useState({})

  useEffect(() => {
    setResponseInfoBoxList([])
    setShowResponse(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = async () => {
    try {
      setLoading(true)

      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined) {
        throw new Error("No signing client")
      }

      const res = await signingClient.execute(
        address || "",
        MARBU_CONTROLLER_ADDRESS,
        {
          create_hub_module: {
            hub_info: store.hubInfo,
          },
        },
        "auto"
      )

      const hubAddress = res.logs[0].events
        .find((event) => event.type === "instantiate")
        ?.attributes.find((attr) => attr.key === "_contract_address")?.value

      setResponseInfoBoxList([
        { title: "Transaction Hash", data: res.transactionHash, short: true },
        { title: "Hub Module Address", data: hubAddress, short: true },
      ])
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
          placeholder="My new project"
          onChange={(name) => store.setHubInfo({ ...store.hubInfo, name })}
          isRequired
          value={store.hubInfo.name}
        />
        <TextInput
          title="Hub Description"
          subtitle="Description of the project"
          placeholder="My new project is new"
          onChange={(description) =>
            store.setHubInfo({ ...store.hubInfo, description })
          }
          isRequired
          value={store.hubInfo.description}
        />
        <TextInput
          title="Hub Image"
          subtitle="Image of the project"
          placeholder="https://my-new-project.com/image.png"
          onChange={(image) => store.setHubInfo({ ...store.hubInfo, image })}
          isRequired
          value={store.hubInfo.image}
        />
        <TextInput
          title="External Link"
          subtitle="Link to the project"
          placeholder="https://my-new-project.com"
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
