import { useState } from "react";
import Trade from "./Trade";
import JunkCard from "./JunkCard";

const JunkList = ({ junks, lastJunks }: any) => {
  const [junkToTrade, setJunkToTrade] = useState(null);
  const [isIncrease, setIsIncrease] = useState(true);

  const handleClickTrade = (junk: any, index: any) => {
    if (lastJunks != null) {
      setIsIncrease(junk.price > lastJunks[index].price);
    }
    setJunkToTrade(junk);
  };

  return (
    <div className="flex justify-center py-[20px]">
      {junkToTrade != null && (
        <Trade
          junkToTrade={junkToTrade}
          close={() => setJunkToTrade(null)}
          isIncrease={isIncrease}
        />
      )}
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col lg:flex-row h-full w-full px-2">
          <div className="w-full">
            <div className="p-[10px]">
              <div className="flex justify-center flex-wrap gap-[15px]">
                {junks == null
                  ? "Loading..."
                  : junks.map((junk: any, index: any) => (
                      <JunkCard
                        key={index}
                        index={index}
                        junk={junk}
                        lastJunks={lastJunks}
                        handleClickTrade={() => handleClickTrade(junk, index)}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JunkList;
