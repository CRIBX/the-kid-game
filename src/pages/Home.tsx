import { useState } from "react";
import { useAccount } from "wagmi";
import PlayModal from "../components/Modal/Play";
import Title from "../components/Typo/Title";
import Footer from "../components/Footer";

export default function Home({ player }: any) {
  const [isShowPlay, setIsShowPlay] = useState(false);
  const { isConnected } = useAccount();

  return (
    <div>
      {isShowPlay && isConnected && (
        <PlayModal close={() => setIsShowPlay(false)} player={player} />
      )}
      {isShowPlay && !isConnected && (
        <div className="absolute bottom-[20px] left-[20px] bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
          <p className="font-bold">Warning</p>
          <p>You should connect wallet to play the game.</p>
        </div>
      )}
      <div className="flex justify-center h-screen">
        <video autoPlay loop muted className="bgvideo">
          <source
            src="https://res.cloudinary.com/dmaghmyxm/video/upload/v1682632596/esn7nrlavdigi2b8sjmx.mp4"
            type="video/mp4"
          />
        </video>
        <div className="w-full lg:w-[1024px] flex flex-col items-center">
          <div className="flex flex-col justify-between items-center h-full pt-[80px] pb-[40px]">
            <Title />
            <div>
              <button
                onClick={() => setIsShowPlay(true)}
                className="font-[BakbakOne] bg-[#d33] hover:bg-[#f33] active:bg-[#e33] px-[40px] py-[20px] font-[600] text-[22px] tracking-widest rounded-sm"
              >
                <div className="text-white">ENTER GAME</div>
              </button>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
