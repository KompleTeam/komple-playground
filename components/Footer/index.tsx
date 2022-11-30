import { FooterInfo } from "components/FooterInfo"
import Image from "next/image"

export const Footer = () => {
  return (
    <div className="w-full h-[240px] pt-[50px] bg-komple-black-600 border-t-[1px] border-komple-black-500">
      <div className="flex justify-center">
        <div className="flex justify-evenly mb-10 max-w-[1440px] w-[1440px]">
          <FooterInfo
            link="https://cosmwasm.com/"
            text="Powered by"
            image="/brand/cosmwasm.svg"
            imageSize={{ height: 150, width: 150 }}
          />
          <FooterInfo
            link="https://junonetwork.io/"
            text="Built on"
            image="/brand/juno.svg"
            imageSize={{ height: 90, width: 90 }}
          />
          <FooterInfo
            link="https://tabellio.io/"
            text="Developed by"
            image="/brand/tabellio.svg"
            imageSize={{ height: 120, width: 120 }}
          />
          <FooterInfo
            link="https://cosmos.network/"
            text="Made for"
            image="/brand/cosmos.svg"
            imageSize={{ height: 150, width: 150 }}
          />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <a
          href="https://github.com/KompleTeam"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/github.svg"
            alt="Github Logo"
            height={30}
            width={30}
          />
        </a>
        <a
          href="https://docs.komple.io"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-5"
        >
          <Image
            src="/icons/docs.svg"
            alt="Documentation Logo"
            height={30}
            width={30}
          />
        </a>
        <a
          href="https://twitter.com/KompleSocial"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/icons/twitter.svg"
            alt="Twitter Logo"
            height={30}
            width={30}
          />
        </a>
      </div>
    </div>
  )
}
