import Head from "next/head"

export default function NotFound() {
  return (
    <div className="h-full w-full">
      <Head>
        <title>Komple Playground</title>
        <meta property="og:title" content="Komple Playground" key="title" />
        <meta name="twitter:title" content="Komple Playground" />
        <meta
          name="twitter:description"
          content="Website to test out and build Komple applications."
        />
        <meta name="twitter:image" content="/card.png" />
        <meta
          name="twitter:card"
          content="Website to test out and build Komple applications."
        />
      </Head>

      <div className="flex items-center justify-center">
        <div className="text-white">Page not found</div>
      </div>
    </div>
  )
}
