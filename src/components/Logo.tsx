import sewingLogo from "../assets/sewingLogo.png";
import Image from "next/image";

export default function Logo() {
  return (
    <>
      <div className="overflow-hidden rounded-lg">
        <Image
          src={sewingLogo}
          alt="logo pinda studio"
          className="size-9 scale-200 border"
        />
      </div>

      <span className="text-2xl font-black bg-clip-text text-white">
        PINDA.STUDIO<span className="ml-1">®</span>
      </span>
    </>
  );
}
