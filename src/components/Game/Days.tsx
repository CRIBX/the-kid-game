import { useContext } from "react";
import { UserContext, UserContextType } from "../../contexts/UserContext";

const Days = () => {
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <div className="flex flex-col items-center py-[20px]">
      {!user ? (
        "Loading..."
      ) : (
        <>
          <div className="w-[150px] h-[20px] bg-[#fff]">
            <div
              className={`h-[20px] bg-[#f00]`}
              style={{ width: user.days * 5 + "px" }}
            />
          </div>
          <div className="font-[BakbakOne] text-[#aab] text-[20px]">
            DAY {user?.days}/30
          </div>
        </>
      )}
    </div>
  );
};

export default Days;
