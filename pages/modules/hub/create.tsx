import { useState } from "react"
import { ContractHeader } from "components/contracts/ContractHeader"
import { TextInput } from "components/TextInput"
import { useAccount } from "graz"
import { connect } from "utils/wallet"
import { ContractForm } from "components/contracts/ContractLayout"
import { DOC_LINKS } from "config/docs"
import { toBinary } from "@cosmjs/cosmwasm-stargate"

export default function FeeModuleCreate() {
  const { data: account } = useAccount()

  const [response, setResponse] = useState({})

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [link, setLink] = useState("")
  const [marbuFeeModule, setMarbuFeeModule] = useState("")

  const submit = async ({ codeId }: { codeId: string }) => {
    try {
      const client = await connect()
      const res = await client.instantiate(
        account?.bech32Address || "",
        parseInt(codeId),
        {
          admin: account?.bech32Address || "",
          data: toBinary({
            hub_info: {
              name,
              description,
              image,
              external_link: link === "" ? undefined : link,
            },
            marbu_fee_module:
              marbuFeeModule === "" ? undefined : marbuFeeModule,
          }),
        },
        "Komple Hub Module",
        "auto",
        { admin: account?.bech32Address }
      )

      setResponse(res)
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
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
          title="Name"
          subtitle="Name of the project"
          placeholder="My awesome project"
          onChange={setName}
          isRequired
        />
        <TextInput
          title="Description"
          subtitle="Description of the project"
          onChange={setDescription}
          placeholder="My awesome project is awesome"
          isRequired
        />
        <TextInput
          title="Image"
          subtitle="Image of the project"
          onChange={setImage}
          placeholder="https://my-awesome-project.com/image.png"
          isRequired
        />
        <TextInput
          title="External Link"
          subtitle="Link to the project"
          placeholder="https://my-awesome-project.com"
          onChange={setLink}
        />
        <TextInput
          title="Marbu Fee Module"
          subtitle="Marbu Fee Module address"
          placeholder="juno1..."
          onChange={setMarbuFeeModule}
        />
      </ContractForm>
    </div>
  )
}
