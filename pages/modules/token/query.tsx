import { useEffect, useState } from "react"
import { ContractForm } from "components/contracts/ContractLayout"
import { ContractHeader } from "components/contracts/ContractHeader"
import { Dropdown } from "components/Dropdown"
import { DOC_LINKS } from "config/docs"
import Head from "next/head"
import {
  TokenModuleMintedTokensPerAddress,
  TokenModuleTokenLocks,
  TokenModuleOwnerOf,
  TokenModuleApproval,
  TokenModuleApprovals,
  TokenModuleAllOperators,
  TokenModuleNftInfo,
  TokenModuleTokens,
  TokenModuleAllTokens,
} from "components/forms/query"
import { useAppStore, useTokenModuleStore } from "store"
import { showToast } from "utils/showToast"
import { useKompleClient } from "hooks/kompleClient"

const QUERIES = [
  "get_owner_of_NFT",
  "get_operator_status",
  "get_operators_for_NFT",
  "get_all_operators_for_address",
  "list_number_of_NFTs",
  "list_contract_info",
  "get_NFT_info",
  "get_contract_config",
  "list_NFTs_for_address",
  "list_all_NFTs",
  "list_contract_locks",
  "list_NFT_locks",
  "get_total_minted_tokens_per_address",
  "list_sub_modules",
  "list_contract_operators",
]

export default function FeeModuleQuery() {
  const { kompleClient } = useKompleClient()

  const store = useTokenModuleStore((state) => state)
  const setLoading = useAppStore((state) => state.setLoading)
  const setResponseInfoBoxList = useAppStore(
    (state) => state.setResponseInfoBoxList
  )
  const setShowResponse = useAppStore((state) => state.setShowResponse)

  const [queryMsg, setQueryMsg] = useState<string>("")
  const [response, setResponse] = useState<any>({})

  useEffect(() => {
    store.clear()
    setResponseInfoBoxList([])
    setShowResponse(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dropdownOnChange = (index: number) => {
    let value = QUERIES[index]
    setQueryMsg(value)
  }

  const submit = async ({ contract }: { contract: string }) => {
    try {
      setLoading(true)

      if (!kompleClient) {
        throw new Error("Komple client is not initialized")
      }

      const tokenModule = await kompleClient.tokenModule(contract)

      switch (queryMsg) {
        case "get_owner_of_NFT": {
          const msg = {
            tokenId: store.tokenId,
            includeExpired: undefined,
          }

          setResponse(await tokenModule.queryClient.ownerOf(msg))
          break
        }
        case "get_operator_status": {
          const msg = {
            tokenId: store.tokenId,
            spender: store.recipient,
            includeExpired: undefined,
          }

          setResponse(await tokenModule.queryClient.approval(msg))
          break
        }
        case "get_operators_for_NFT": {
          const msg = {
            tokenId: store.tokenId,
            includeExpired: undefined,
          }

          setResponse(await tokenModule.queryClient.approvals(msg))
          break
        }
        case "get_all_operators_for_address": {
          const msg = {
            owner: store.recipient,
            includeExpired: undefined,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          setResponse(await tokenModule.queryClient.allOperators(msg))
          break
        }
        case "list_number_of_NFTs":
          setResponse(await tokenModule.queryClient.numTokens())
          break
        case "list_contract_info":
          setResponse(await tokenModule.queryClient.contractInfo())
          break
        case "get_NFT_info": {
          const msg = {
            tokenId: store.tokenId,
          }

          setResponse(await tokenModule.queryClient.nftInfo(msg))
          break
        }
        case "get_contract_config":
          setResponse(await tokenModule.queryClient.config())
          break
        case "list_contract_locks":
          setResponse(await tokenModule.queryClient.locks())
          break
        case "list_NFT_locks": {
          const msg = {
            tokenId: store.tokenId,
          }

          setResponse(await tokenModule.queryClient.tokenLocks(msg))
          break
        }
        case "get_total_minted_tokens_per_address": {
          const msg = {
            address: store.recipient,
          }

          setResponse(await tokenModule.queryClient.mintedTokensPerAddress(msg))
          break
        }
        case "list_sub_modules":
          setResponse(await tokenModule.queryClient.subModules())
          break
        case "list_contract_operators":
          setResponse(await tokenModule.queryClient.moduleOperators())
          break
        case "list_NFTs_for_address": {
          const msg = {
            owner: store.recipient,
            startAfter: store.startAfter,
            limit: store.limit,
          }

          setResponse(await tokenModule.queryClient.tokens(msg))
          break
        }
        case "list_all_NFTs": {
          const msg = {
            startAfter: store.startAfter,
            limit: store.limit,
          }

          setResponse(await tokenModule.queryClient.allTokens(msg))
          break
        }
      }

      setLoading(false)
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Query Token Module",
        message: error.message,
      })
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full">
      <Head>
        <title>Token Module | Komple Playground</title>
        <meta
          property="og:title"
          content="Token Module | Komple Playground"
          key="title"
        />
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

        {queryMsg === "get_owner_of_NFT" && <TokenModuleOwnerOf />}
        {queryMsg === "get_operator_status" && <TokenModuleApproval />}
        {queryMsg === "get_operators_for_NFT" && <TokenModuleApprovals />}
        {queryMsg === "list_NFT_locks" && <TokenModuleTokenLocks />}
        {queryMsg === "get_total_minted_tokens_per_address" && (
          <TokenModuleMintedTokensPerAddress />
        )}
        {queryMsg === "get_all_operators_for_address" && (
          <TokenModuleAllOperators />
        )}
        {queryMsg === "get_NFT_info" && <TokenModuleNftInfo />}
        {queryMsg === "list_NFTs_for_address" && <TokenModuleTokens />}
        {queryMsg === "list_all_NFTs" && <TokenModuleAllTokens />}
      </ContractForm>
    </div>
  )
}
