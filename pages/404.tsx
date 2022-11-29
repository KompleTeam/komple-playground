import Head from "next/head"

export default function NotFound() {
  return (
    <div className="h-full w-full">
      <Head>
        <title>Komple Framework Playground</title>
        <meta
          property="og:title"
          content="Komple Framework Playground"
          key="title"
        />
      </Head>

      <div className="flex items-center justify-center">
        <div className="text-white">Page not found</div>
      </div>
    </div>
  )
}
