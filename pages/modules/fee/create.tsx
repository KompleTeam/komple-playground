import { useEffect, useState } from "react"
import { ContractHeader } from "components/contracts/ContractHeader"
import { TextInput } from "components/TextInput"
import { ContractForm } from "components/contracts/ContractLayout"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import { useFeeModuleStore, useAppStore } from "store"
import { FEE_MODULE_CODE_ID } from "config/codeIds"
import { useKompleClient } from "hooks/kompleClient"
import { showToast } from "utils/showToast"

export default function FeeModuleCreate() {
  const { kompleClient, address } = useKompleClient()

  const store = useFeeModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)
  const setResponseInfoBoxList = useAppStore(
    (state) => state.setResponseInfoBoxList
  )
  const setShowResponse = useAppStore((state) => state.setShowResponse)

  const [response, setResponse] = useState({})

  useEffect(() => {
    store.clear()
    setResponseInfoBoxList([])
    setShowResponse(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = async () => {
    try {
      setLoading(true)

      if (!kompleClient) {
        throw new Error("Komple client is not initialized")
      }

      const res = await kompleClient.client.instantiate(
        address || "",
        FEE_MODULE_CODE_ID,
        {
          admin: store.admin,
        },
        "Komple Fee Module",
        "auto"
      )

      setResponse(res)
      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Create Fee Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Fee Module | Komple Playground</title>
        <meta
          property="og:title"
          content="Fee Module | Komple Playground"
          key="title"
        />
      </Head>

      <ContractHeader
        title="Fee Module"
        description="Fee module is used for general fee adjustment and distribution in Komple Framework."
        documentation={DOC_LINKS.modules.fee}
      />
      <ContractForm
        name="Fee"
        isModule={true}
        response={response}
        action="create"
        submit={submit}
      >
        <TextInput
          title="Admin Address"
          subtitle="Address of the contract admin"
          placeholder="juno..."
          onChange={store.setAdmin}
          isRequired
          value={store.admin}
        />
      </ContractForm>
    </div>
  )
}
