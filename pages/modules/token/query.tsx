import { useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { useWallet } from "@cosmos-kit/react"
import { DOC_LINKS } from "config/docs"
import { KompleClient } from "komplejs"
import Head from "next/head"
import {
  TokenModuleMintedTokensPerAddress,
  TokenModuleTokenLocks,
} from "components/forms/query/token"
import useTokenModuleStore from "store/modules/token"

const QUERIES = [
  "config",
  "locks",
  "token_locks",
  "minted_tokens_per_address",
  "sub_modules",
  "module_operators",
]

export default function FeeModuleQuery() {
  const { getSigningCosmWasmClient, offlineSigner } = useWallet()

  const store = useTokenModuleStore((state) => state)

  const [queryMsg, setQueryMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  const dropdownOnChange = (index: number) => {
    let value = QUERIES[index]
    setQueryMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("client or signer is not ready")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const tokenModule = await kompleClient.tokenModule(contract)
      const client = tokenModule.queryClient.client

      switch (queryMsg) {
        case "config":
          return setResponse(
            await client.queryContractSmart(contract, {
              extension: {
                msg: {
                  config: {},
                },
              },
            })
          )
        case "locks":
          return setResponse(
            await client.queryContractSmart(contract, {
              extension: {
                msg: {
                  locks: {},
                },
              },
            })
          )
        case "token_locks": {
          const msg = {
            token_id: store.tokenId,
          }

          return setResponse(
            await client.queryContractSmart(contract, {
              extension: {
                msg: {
                  token_locks: msg,
                },
              },
            })
          )
        }
        case "minted_tokens_per_address": {
          const msg = {
            address: store.recipient,
          }

          return setResponse(
            await client.queryContractSmart(contract, {
              extension: {
                msg: {
                  minted_tokens_per_address: msg,
                },
              },
            })
          )
        }
        case "sub_modules":
          return setResponse(
            await client.queryContractSmart(contract, {
              extension: {
                msg: {
                  sub_modules: {},
                },
              },
            })
          )
        case "module_operators":
          return setResponse(
            await client.queryContractSmart(contract, {
              extension: {
                msg: {
                  module_operators: {},
                },
              },
            })
          )
      }
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Query Token Module</title>
        <meta property="og:title" content="Query Token Module" key="title" />
      </Head>

      <ContractHeader
        title="Token Module"
        description="Token Module is used collection configuration and token management."
        documentation={DOC_LINKS.modules.token}
      />
      <ContractForm
        name="Token"
        isModule={true}
        response={response}
        action="query"
        submit={submit}
        hidden={["create"]}
      >
        <Dropdown
          items={QUERIES}
          title="Select Query Messages"
          onChange={dropdownOnChange}
          placeholder="Select query message"
        />

        {queryMsg === "token_locks" && <TokenModuleTokenLocks />}
        {queryMsg === "minted_tokens_per_address" && (
          <TokenModuleMintedTokensPerAddress />
        )}
      </ContractForm>
    </div>
  )
}
