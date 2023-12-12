import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Logo } from "../Icons";

export default function Header() {
  return (
    <header className="fixed top-0 z-20 h-[80px] px-5 flex items-center justify-between w-full backdrop-blur transition-colors bg-[#FFFFFF50]">
      <Link to="/" className="flex items-center">
        <Logo />
      </Link>
      <div className="flex items-center gap-2">
        <ConnectButton />
      </div>
    </header>
  );
}
