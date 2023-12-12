import { useContext } from "react";
import DepositModal from "./DepositModal";
import { UserContext, UserContextType } from "../../contexts/UserContext";

const Profile = ({ handleDebtClick, isShowBank, setIsShowBank }: any) => {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <>
      {isShowBank && (
        <DepositModal
          close={() => setIsShowBank(false)}
          isShowBank={isShowBank}
        />
      )}

      <div className="flex font-[DigitalNumbers] text-[18px]">
        <div className="flex flex-col items-center mr-[5px]">
          <button className="bg-[#36a671] text-[#fff] h-[25px] w-[100px]">
            CREDITS
          </button>
          <div className="text-[#36a671] bg-[#fff2] flex items-center justify-center h-[25px] w-[100px] mt-[3px]">
            {user == null ? "Loading" : `${user.cash}`}
          </div>
        </div>
        <div className="flex flex-col items-center mr-[5px]">
          <button
            onClick={() => setIsShowBank(true)}
            className="bg-[#a1c058] text-[#fff] h-[25px] w-[100px]"
          >
            BANK
          </button>
          <div className="text-[#a1c058] bg-[#fff2] flex items-center justify-center h-[25px] w-[100px] mt-[3px]">
            {user == null ? "Loading" : `${user.bank}`}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleDebtClick}
            className="bg-[#de4a3a] text-[#fff] h-[25px] w-[100px]"
          >
            DEBT
          </button>
          <div className="text-[#de4a3a] bg-[#fff2] flex items-center justify-center h-[25px] w-[100px] mt-[3px]">
            {user == null ? "Loading" : `${user.debt}`}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
