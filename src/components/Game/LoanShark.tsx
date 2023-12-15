import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRef, useState, useEffect, useContext } from "react";
import { loanSharks } from "../../assets/data";
import { userService } from "../../utils/api";
import {
  LoanType,
  UserContext,
  UserContextType,
} from "../../contexts/UserContext";
import SharkConfirmDlg from "./LoanSharkConfirm";

const LoanShark = ({ sharkIndex, close, setSharkIndex }: any) => {
  const [amount, setAmount] = useState(loanSharks[sharkIndex].amount);
  const [openConfirmBorrow, setOpenConfirmBorrow] = useState(false);
  const [openConfirmRepay, setOpenConfirmRepay] = useState(false);
  const [loanState, setLoanState] = useState<LoanType | null>();

  const { user, setUser } = useContext(UserContext) as UserContextType;

  const aniRef: any = useRef();

  const handleChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const handleRePayClick = async () => {
    const updatedCash = Number(user.cash) - Number(amount);
    const updatedDebt = Number(user.debt) - Number(amount);
    const updatedLoans = user.loans;
    const index = updatedLoans.findIndex(
      (loan) => loan.id == loanSharks[sharkIndex].id
    );
    if (index !== -1) {
      updatedLoans.splice(index, 1);
    }
    const updatedUserInfo = {
      ...user,
      cash: updatedCash,
      debt: updatedDebt,
      loans: updatedLoans,
    };
    // save userinfo to database
    await userService.update({
      data: updatedUserInfo,
    });
    setUser(updatedUserInfo);
    setOpenConfirmRepay(true);
  };

  const handleBorrowClick = async () => {
    const updatedCash = Number(user.cash) + Number(amount);
    const updatedDebt = Number(user.debt) + Number(amount);
    const updatedLoans = user.loans;
    updatedLoans.push({
      id: loanSharks[sharkIndex].id,
      amount: amount,
      backBlock: Number(user.days) + loanSharks[sharkIndex].limit,
    });
    const updatedUserInfo = {
      ...user,
      cash: updatedCash,
      debt: updatedDebt,
      loans: updatedLoans,
    };
    setUser(updatedUserInfo);
    // save user info
    await userService.update({ data: updatedUserInfo });
    setOpenConfirmBorrow(true);
  };

  function isLend(index: number) {
    let lendID = -1;
    for (let i = 0; i < user.loans.length; i++) {
      if (user.loans[i].id == index + 1) {
        lendID = i;
      }
    }
    return lendID;
  }

  const goNext = () => {
    if (sharkIndex < loanSharks.length - 1) {
      setSharkIndex(sharkIndex + 1);
    } else {
      setSharkIndex(0);
    }
  };

  const goPrev = () => {
    if (sharkIndex > 0) {
      setSharkIndex(sharkIndex - 1);
    } else {
      setSharkIndex(loanSharks.length - 1);
    }
  };

  const getRate = () => {
    let rate = "";
    const index = user.loans.findIndex(
      (loan) => loan.id === loanSharks[sharkIndex].id
    );
    if (index !== -1) {
      const loan = user.loans[index];
      rate = (
        100 -
        ((loan.backBlock - Number(user.days)) / loanSharks[sharkIndex].limit) *
          100
      ).toFixed(0);
    }
    return rate;
  };

  useEffect(() => {
    aniRef.current?.load();
    setAmount(loanSharks[sharkIndex].amount);
    const index = user.loans.findIndex((loan) => loan.id === sharkIndex + 1);
    if (index !== -1) {
      setLoanState(user.loans[index]);
    } else {
      setLoanState(null);
    }
  }, [sharkIndex, user]);

  useEffect(() => {
    if (!!aniRef.current) {
      aniRef.current?.addEventListener("play", handleVideo);
    }
  }, [aniRef]);

  const handleVideo = () => {
    aniRef.current.muted = false;
  };

  return (
    <div className="fixed bg-[#caac] backdrop-blur-sm z-[1] left-0 top-0 w-full h-full flex justify-center">
      {openConfirmBorrow && (
        <SharkConfirmDlg
          onOk={handleBorrowClick}
          onClose={() => setOpenConfirmBorrow(false)}
          text={`Will you borrow ${amount} CRBN?`}
          loanShark={loanSharks[sharkIndex]}
        />
      )}

      {openConfirmRepay && (
        <SharkConfirmDlg
          onOk={handleRePayClick}
          onClose={() => setOpenConfirmRepay(false)}
          text={`Will you Repay ${amount} CRBN?`}
          loanShark={loanSharks[sharkIndex]}
        />
      )}

      <div className="flex flex-col items-center">
        <div className="absolute top-[100px] flex flex-col items-center">
          <div className="bg-[#a22] border-1 border-[#000] px-[20px] text-[#fff] mb-[10px] text-[28px]">
            {loanSharks[sharkIndex].name}
          </div>
          <div className="bg-[#a22] border-1 border-[#000] px-[20px] text-[#fff]">
            {/* DAILY INTEREST RATE: {loanSharks[sharkIndex].rate}% */}
            DAILY INTEREST RATE:{" "}
            {!(isLend(sharkIndex) === -1)
              ? getRate()
              : loanSharks[sharkIndex].rate}
            %
          </div>
        </div>

        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <video
            className="w-[400px] h-[250px]"
            ref={aniRef}
            autoPlay
            loop
            muted
          >
            <source src={loanSharks[sharkIndex].animation} type="video/mp4" />
          </video>
          <div
            onClick={goPrev}
            className="absolute top-[50%] translate-y-[-50%] cursor-pointer -left-[42px] h-0 w-0 border-y-[16px] border-y-transparent border-r-[32px] border-r-blue-600"
          ></div>
          <div
            onClick={goNext}
            className="absolute top-[50%] translate-y-[-50%] cursor-pointer -right-[42px]  h-0 w-0 border-y-[16px] border-y-transparent border-l-[32px] border-l-blue-600"
          ></div>
          <div className="absolute -bottom-[100px] w-[400px] h-[100px] flex justify-center items-center gap-[10px]">
            {loanSharks.map((shark, i) => (
              <div
                key={i}
                className="w-[20px] h-[20px] bg-white flex justify-center items-center"
              >
                {sharkIndex === i && (
                  <div className="w-[16px] h-[16px] bg-blue-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-[30px] flex flex-col items-center">
          <div>
            {isLend(sharkIndex) === -1 ? (
              <div>{`Limit Time: ${loanSharks[sharkIndex].limit} days`}</div>
            ) : (
              <div>
                <div>
                  {!!loanState &&
                    `Left Time: ${loanState.backBlock - user.days}days`}
                </div>
              </div>
            )}
          </div>
          <div>
            {isLend(sharkIndex) == -1 ? (
              <div>Not borrow yet</div>
            ) : (
              <div>{user.loans[isLend(sharkIndex)]?.amount} CRBN DEBT</div>
            )}
          </div>
          <div className="flex">
            <button
              onClick={() => setOpenConfirmRepay(true)}
              className="bg-[#aaa] disabled:bg-[#555] enabled:hover:bg-[#ccc] w-[70px] h-[70px] flex flex-col justify-center items-center rounded-[50%] border-2 font-[600] border-[#000] disabled:border-[#555] disabled:text-[#444] leading-none"
              disabled={isLend(sharkIndex) == -1}
            >
              <div className="text-[20px]">+</div>
              <div className="text-[12px]">REPAY</div>
            </button>
            <input
              type="range"
              value={amount}
              max={loanSharks[sharkIndex].amount}
              min={0}
              onChange={handleChangeAmount}
              className="mx-[20px] w-[200px]"
            />
            <button
              onClick={() => setOpenConfirmBorrow(true)}
              className="bg-[#aaa] disabled:bg-[#555] enabled:hover:bg-[#ccc] w-[70px] h-[70px] flex flex-col justify-center items-center rounded-[50%] border-2 font-[600] border-[#000] disabled:border-[#555] disabled:text-[#444] leading-none"
              disabled={isLend(sharkIndex) !== -1}
            >
              <div className="text-[20px]">+</div>
              <div className="text-[12px]">BORROW</div>
            </button>
          </div>
          <div className="bg-[#fff] px-[5px] border-1 border-[#000] rounded">
            {amount}/{user.cash} CRBN
          </div>
        </div>
        <button
          onClick={close}
          className="text-[#fff] text-[48px] absolute top-[100px] right-[50px]"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default LoanShark;
