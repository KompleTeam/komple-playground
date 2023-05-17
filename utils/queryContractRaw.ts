import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { fromUtf8, toUtf8 } from "@cosmjs/encoding"

/* User for querying Item type */
const item = async (
  client: CosmWasmClient,
  address: string,
  namespace: string
) => {
  const data = await client.queryContractRaw(address, toUtf8(namespace))

  if (data && data.length > 0) {
    return JSON.parse(fromUtf8(data))
  }
  return data
}

const getPrefix = (value: string) => {
  return value.length.toString(16).padStart(4, "0")
}

/* Used for querying Map type */
const map = async (
  client: CosmWasmClient,
  address: string,
  namespace: string,
  keys: any[]
) => {
  const prefix = getPrefix(namespace)
  const key =
    prefix +
    Buffer.from(namespace).toString("hex") +
    keys
      .map((k, idx) => {
        let value = ""

        switch (typeof k) {
          case "string":
            value = Buffer.from(k).toString("hex")
            if (idx !== keys.length - 1) value = getPrefix(k) + value
            break
          case "number":
            value = k.toString(16).padStart(8, "0")
            break
        }

        return value
      })
      .join("")

  const data = await client.queryContractRaw(
    address,
    Uint8Array.from(Buffer.from(key, "hex"))
  )

  if (data && data.length > 0) {
    return JSON.parse(fromUtf8(data))
  }
  return data
}

const queryContractRaw = { item, map }

export default queryContractRaw
