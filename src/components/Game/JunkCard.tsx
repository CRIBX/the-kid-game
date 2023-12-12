import { useState, useContext } from "react";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import Pistol from "../../assets/imgs/icon-pistol.png";

const JunkCard = ({ index, junk, lastJunks, handleClickTrade }: any) => {
  const [isHover, setIsHover] = useState(false);
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <>
      <div
        className={`${
          lastJunks != null && junk.price > lastJunks[index].price
            ? "bg-[#f555]"
            : "bg-[#5f55]"
        } w-[160px] h-[80px] px-[10px] backdrop-blur-sm hover:shadow-[2px_2px_2px_2px_rgba(0,0,0)] shadow-[1px_1px_1px_1px_rgba(0,0,0)] duration-300`}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="w-full text-[#ff0] text-center truncate text-[12px] mt-[5px]">
          {junk.name}
        </div>
        <div className={`flex items-center justsify-between`}>
          <div className="relative">
            <img src={Pistol} alt="pistol" width="50px" />
            <div className="absolute bottom-0 right-0 text-[#fff] text-[10px]">
              x{user.junks[junk.id]?.amount}
            </div>
          </div>
          <div className="px-[5px] flex flex-col w-[90px] items-center">
            <div
              className={`truncate ${
                lastJunks != null && junk.price > lastJunks[index].price
                  ? "text-[#f00]"
                  : "text-[#0f0]"
              } font-[600] text-[14px]`}
            >
              {junk.price} CRBN
            </div>
            <button
              onClick={handleClickTrade}
              className={`bg-[#000] text-[#fff] hover:text-[#0f0] duration-300 ${
                junk.price < user?.cash
                  ? "hover:-translate-y-0.5 active:translate-y-0.5"
                  : ""
              } w-[70px] h-[25px] text-[14px] rounded mr-1 disabled:bg-[#444] disabled:text-[#555]`}
              disabled={junk.price > user?.cash}
            >
              TRADE
            </button>
          </div>
        </div>
        {isHover && (
          <div className="absolute -top-[50px] left-0 z-10 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700">
            {junk.name}
          </div>
        )}
      </div>
    </>
  );
};
export default JunkCard;
