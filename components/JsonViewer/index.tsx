export const JsonViewer = ({ json }: { json: any }) => {
  return (
    <div className="border-[2px] border-komple-black-300 rounded-md p-3 overflow-scroll w-[650px] max-w-[650px]">
      <pre className="text-white text-[14px]">
        {JSON.stringify(json, null, 2)}
      </pre>
    </div>
  )
}
