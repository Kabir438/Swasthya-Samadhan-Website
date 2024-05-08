import Link from "next/link";
import Image from "next/image";
import { ShimmerButton } from "../ui/shimmer-button";

export default function Header() {
  return (
    <header className="flex relative h-16 bg-black w-full items-center justify-between z-[1] shadow-none px-4 md:px-6 dark:bg-black" style={{
      boxShadow: "0px 0px 55px 20px #000000"
    }}>
      <Link className="mr-4 md:mr-6 z-[1]" href="#">
        <Image
          src={"/logos/english.png"}
          alt={"Logo"}
          width={1912 / 5.5}
          height={278 / 5.5}
        />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <div className="flex-1 justify-end hidden md:flex gap-3">
        <nav className="flex items-center space-x-4">
          <Link
            className="flex items-center z-[1] transition-colors hover:text-gray-500 dark:hover:text-gray-400"
            href="#"
          >
            About
          </Link>
          <Link
            className="flex items-center z-[1] transition-colors hover:text-gray-500 dark:hover:text-gray-400"
            href="#"
          >
            Features
          </Link>
          <Link
            className="flex items-center z-[1] transition-colors hover:text-gray-500 dark:hover:text-gray-400"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="flex items-center z-[1] transition-colors hover:text-gray-500 dark:hover:text-gray-400"
            href="#"
          >
            Resources
          </Link>
        </nav>
        <ShimmerButton>Download the App</ShimmerButton>
      </div>
    </header>
  );
}
