import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import BankConfirmDlg from "./BankConfirm";

const DepositModal = ({ close, isShowBank }: any) => {
  // const withdrawMaxAmount = user?.bank;
  // const depositMaxAmount = user?.credits >= 0 ? user.credits : 0;
  const [depositMaxAmount, setDepositMaxAmount] = useState(0);
  const [withdrawMaxAmount, setWithdrawMaxAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

  const { user, setUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    // get user token balance
    if (isShowBank) {
      setDepositMaxAmount(user?.cash >= 0 ? user.cash : 0);
      setWithdrawMaxAmount(user?.bank);
    }
  }, [isShowBank, user?.bank, user?.cash]);

  const handleDepositClick = async () => {
    const updatedCash = Number(user.cash) - Number(depositAmount);
    const updatedBank = Number(user.bank) + Number(depositAmount);
    const updatedUserInfo = {
      ...user,
      cash: updatedCash,
      bank: updatedBank,
    };
    setUser(updatedUserInfo);
    await axios.post(`${process.env.REACT_APP_API_URL}/updateuser`, {
      data: updatedUserInfo,
    });
    setOpenDeposit(false);
    setDepositAmount(0);
  };

  const handleWithdrawClick = async () => {
    const updatedCash = Number(user.cash) + Number(withdrawAmount);
    const updatedBank = Number(user.bank) - Number(withdrawAmount);
    const updatedUserInfo = {
      ...user,
      cash: updatedCash,
      bank: updatedBank,
    };
    setUser(updatedUserInfo);
    await axios.post(`${process.env.REACT_APP_API_URL}/updateuser`, {
      data: updatedUserInfo,
    });
    setOpenWithdraw(false);
    setWithdrawAmount(0);
  };

  function handleChangeAmount(e: any) {
    setDepositAmount(e.target.value);
  }
  function handleChangeWithdrawAmount(e: any) {
    setWithdrawAmount(e.target.value);
  }

  return (
    <>
      {openDeposit && (
        <BankConfirmDlg
          onOk={handleDepositClick}
          onClose={() => setOpenDeposit(false)}
          text={`Will you ${depositAmount}CRBN deposit?`}
        />
      )}
      {openWithdraw && (
        <BankConfirmDlg
          onOk={handleWithdrawClick}
          onClose={() => setOpenWithdraw(false)}
          text={`Will you ${withdrawAmount}CRBN withdraw?`}
        />
      )}
      <div className="fixed bg-[#0009] z-[10] left-0 top-0 w-full h-full flex justify-center items-center">
        <div className="bg-[#020618] px-5 py-4">
          <div className="text-[#fff] mb-3 text-center text-[28px]">Bank</div>
          <div className="text-[#fff] mb-3">Benefit per day: 2%</div>
          <div className="border-1 border-[#222638] p-3 w-[300px] h-[130px] flex flex-col items-center justify-center">
            <div className="flex items-center mb-3">
              <div className="mr-5 leading-none w-full">
                <div className="text-[#777]">Deposit Amount</div>
                <div className="text-[#fff] text-[20px]">
                  {depositAmount} CRBN
                </div>
              </div>
              <button
                className="bg-[#075] hover:bg-[#086] active:bg-[#064] duration-500 text-[#fff] w-[150px] h-[40px] mr-[10px] rounded-[50px]"
                onClick={() => setOpenDeposit(true)}
              >
                Deposit
              </button>
            </div>
            <input
              className="w-full"
              type="range"
              value={depositAmount}
              max={depositMaxAmount}
              min={0}
              onChange={handleChangeAmount}
            />
          </div>
          <div className="border-1 border-[#222638] p-3 w-[300px] h-[130px] flex flex-col items-center justify-center">
            <div className="flex items-center mb-3">
              <div className="mr-5 leading-none w-full">
                <div className="text-[#777]">Withdraw Amount</div>
                <div className="text-[#fff] text-[20px]">
                  {withdrawAmount} CRBN
                </div>
              </div>
              <button
                className="bg-[#075] hover:bg-[#086] active:bg-[#064] duration-500 text-[#fff] w-[150px] h-[40px] mr-[10px] rounded-[50px]"
                onClick={() => setOpenWithdraw(true)}
              >
                Withdraw
              </button>
            </div>
            <input
              className="w-full"
              type="range"
              value={withdrawAmount}
              max={withdrawMaxAmount}
              min={0}
              onChange={handleChangeWithdrawAmount}
            />
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={close}
              className="bg-[#555] hover:bg-[#666] active:bg-[#444] duration-500 text-[#fff] w-[150px] h-[40px] rounded-[50px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositModal;
