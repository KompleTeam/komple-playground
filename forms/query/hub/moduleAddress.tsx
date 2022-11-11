import { TextInput } from "components/TextInput"
import { useState } from "react"

export const HubQueryModuleAddress = ({
  onChange,
}: {
  onChange: (msg: any) => void
}) => {
  const moduleOnChange = (value: string) => {
    onChange({ module: value })
  }

  return (
    <div>
      <TextInput
        title="Module Name"
        placeholder="fee"
        onChange={moduleOnChange}
        isRequired
      />
    </div>
  )
}
