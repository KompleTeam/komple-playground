import { useState } from "react"
import { Button } from "components/Button"
import { ContractHeader } from "components/ContractHeader"
import { TextInput } from "components/TextInput"
import { useAccount } from "graz"
import { connect } from "utils/wallet"
import { ContractForm } from "components/ContractForm"
import { DOC_LINKS } from "config/docs"
import { toBinary } from "@cosmjs/cosmwasm-stargate"

export default function FeeModuleCreate() {
  const { data: account } = useAccount()

  const [codeId, setCodeId] = useState("")
  const [response, setResponse] = useState({})

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [link, setLink] = useState("")
  const [marbuFeeModule, setMarbuFeeModule] = useState("")

  const instantiate = async () => {
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
              external_link: link,
            },
            marbu_fee_module: marbuFeeModule === "" ? null : marbuFeeModule,
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
      <ContractForm name="Hub" isModule={true} response={response}>
        <TextInput
          title="Code ID"
          subtitle="Code ID of the contract"
          placeholder="123"
          onChange={setCodeId}
          isRequired
        />
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
        <Button text="Create Hub Module" onClick={instantiate} />
      </ContractForm>
    </div>
  )
}
