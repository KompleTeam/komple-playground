import { JsonTextArea } from "components/JsonTextArea"
import { TextInput } from "components/TextInput"
import { TextInputList } from "components/TextInputList"
import { useEffect, useState } from "react"

export type HubModuleExecuteType =
  | ""
  | "register_module"
  | "deregister_module"
  | "update_hub_info"
  | "update_operators"
  | "migrate_contracts"

export interface HubModuleExecuteFormMsg {
  codeId: string
  contractAddress: string
  module: string
  name: string
  description: string
  image: string
  link: string
  operators: string[]
  jsonMsg: string
}

export interface HubModuleExecuteInterface {
  executeMsg: HubModuleExecuteType
  onChange: (msg: HubModuleExecuteFormMsg) => void
}

export const HubModuleExecuteForm = ({
  executeMsg,
  onChange,
}: HubModuleExecuteInterface) => {
  const [codeId, setCodeId] = useState("")
  const [contractAddress, setContractAddress] = useState("")
  const [module, setModule] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [link, setLink] = useState("")
  const [operators, setOperators] = useState<string[]>([])
  const [jsonMsg, setJsonMsg] = useState("")

  useEffect(() => {
    onChange({
      codeId,
      contractAddress,
      module,
      name,
      description,
      image,
      link,
      operators,
      jsonMsg,
    })
  }, [
    onChange,
    codeId,
    contractAddress,
    module,
    name,
    description,
    image,
    link,
    operators,
    jsonMsg,
  ])

  return (
    <div>
      {(executeMsg === "register_module" ||
        executeMsg === "migrate_contracts") && (
        <TextInput
          title="Code ID"
          subtitle={
            executeMsg === "register_module"
              ? "Code ID of the contract to register"
              : "Code ID of the contract to migrate"
          }
          onChange={setCodeId}
          isRequired
        />
      )}

      {executeMsg === "migrate_contracts" && (
        <TextInput
          title="Contract Address"
          subtitle="Contract address to migrate"
          onChange={setContractAddress}
          isRequired
        />
      )}

      {(executeMsg === "register_module" ||
        executeMsg === "deregister_module") && (
        <TextInput title="Module Name" onChange={setModule} isRequired />
      )}

      {(executeMsg === "register_module" ||
        executeMsg === "migrate_contracts") && (
        <JsonTextArea
          title={`${
            executeMsg === "register_module" ? "Register" : "Migrate"
          } Message`}
          subtitle="Message to be sent to the contract"
          onChange={setJsonMsg}
          isRequired={executeMsg === "migrate_contracts"}
        />
      )}

      {executeMsg === "update_hub_info" && (
        <>
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
        </>
      )}

      {executeMsg === "update_operators" && (
        <TextInputList
          title="Operator Addresses"
          onChange={setOperators}
          placeholder="juno1..."
        />
      )}
    </div>
  )
}
