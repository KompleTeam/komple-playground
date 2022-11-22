import { useState } from "react"
import { ContractHeader } from "components/contracts/ContractHeader"
import { useWallet } from "@cosmos-kit/react"
import { ContractForm } from "components/contracts/ContractLayout"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { KompleClient } from "komplejs"
import useMarketplaceModuleStore from "store/modules/marketplace"
import { TextInput } from "components/TextInput"
import { Seperator } from "components/Seperator"
import { Switch } from "components/Switch"

export default function MarketplaceModuleCreate() {
  const { getSigningCosmWasmClient, offlineSigner, address } = useWallet()

  const store = useMarketplaceModuleStore((state) => state)

  const [response, setResponse] = useState({})

  const submit = async ({ codeId }: { codeId: string }) => {
    try {
      const signingClient = await getSigningCosmWasmClient()
      if (signingClient === undefined || offlineSigner === undefined) {
        throw new Error("No signing client")
      }

      const kompleClient = new KompleClient(signingClient, offlineSigner)
      const marketplaceModule = await kompleClient.marketplaceModule("")

      const res = await marketplaceModule.instantiate({
        codeId: parseInt(codeId),
        admin: address,
        fundInfo: store.fundInfo,
      })
      setResponse(res)
    } catch (error: any) {
      console.log(error)
      setResponse(error.message)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Create Marketplace Module</title>
        <meta
          property="og:title"
          content="Create Marketplace Module"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Marketplace Module"
        description="Marketplace Module is used for the second hand sale of tokens."
        documentation={DOC_LINKS.modules.marketplace}
      />
      <ContractForm
        name="Marketplace"
        isModule={true}
        response={response}
        action="create"
        submit={submit}
      >
        <Seperator text="Marketplace Currency Info" />
        <Switch
          title="Native Tokens"
          initialState={store.fundInfo.is_native}
          onChange={(is_native) =>
            store.setFundInfo({ ...store.fundInfo, is_native })
          }
        />
        <TextInput
          title={`${
            store.fundInfo.is_native ? "Native Token" : "CW20 Token"
          } Denom`}
          onChange={(denom) => store.setFundInfo({ ...store.fundInfo, denom })}
          isRequired
          value={store.fundInfo.denom}
        />
        {!store.fundInfo.is_native && (
          <TextInput
            title="CW20 Token Address"
            onChange={(cw20_address) =>
              store.setFundInfo({ ...store.fundInfo, cw20_address })
            }
            isRequired
            value={store.fundInfo.cw20_address?.toString()}
          />
        )}
      </ContractForm>
    </div>
  )
}
