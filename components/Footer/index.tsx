import Image from "next/image"
import Link from "next/link"
import { MdOutlineBugReport } from "react-icons/md"

const FooterInfo = ({
  link,
  image,
  imageSize,
  text,
}: {
  link: string
  image: string
  imageSize: Record<string, number>
  text: string
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="h-[90px] w-[210px] flex flex-col items-center justify-center opacity-40 hover:opacity-100"
    >
      <div className="text-[#AAAAAA] text-[16px] mb-3">{text}</div>
      <Image
        src={image}
        alt="Brand Logo"
        height={imageSize["height"]}
        width={imageSize["width"]}
      />
    </a>
  )
}

export const Footer = () => {
  return (
    <div className="w-full h-[240px] pt-[40px] bg-komple-black-600 border-t-[1px] border-komple-black-500">
      <div className="flex justify-center">
        <div className="flex justify-evenly mb-12 max-w-[1440px] w-[1440px]">
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
      <div className="flex w-full justify-center gap-5">
        <Link href="https://github.com/KompleTeam" passHref legacyBehavior>
          <a target="_blank" className="opacity-40 hover:opacity-100">
            <Image
              src="/icons/github.svg"
              alt="Github Logo"
              height={30}
              width={30}
            />
          </a>
        </Link>
        <Link
          href="https://docs.komple.io/komple-framework-playground/overview"
          passHref
          legacyBehavior
        >
          <a target="_blank" className="opacity-40 hover:opacity-100">
            <Image
              src="/icons/docs.svg"
              alt="Documentation Logo"
              height={30}
              width={30}
            />
          </a>
        </Link>
        <Link href="https://twitter.com/KompleSocial" passHref legacyBehavior>
          <a target="_blank" className="opacity-40 hover:opacity-100">
            <Image
              src="/icons/twitter.svg"
              alt="Twitter Logo"
              height={30}
              width={30}
            />
          </a>
        </Link>
        <Link
          href="https://github.com/KompleTeam/komple-playground/issues/new"
          passHref
          legacyBehavior
        >
          <a
            target="_blank"
            className="flex items-center bg-komple-green px-2 py-1 h-[30px] rounded-[4px]"
          >
            <MdOutlineBugReport size={24} className="mr-1" />
            <div className="text-[16px] font-medium">Report Bug</div>
          </a>
        </Link>
      </div>
    </div>
  )
}
