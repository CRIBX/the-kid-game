import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import { CRIBXTokenContract, GameContract } from "../contracts";

const PurchaseToken = () => {
  const { address } = useAccount();
  const [isOpenBuy, setIsOpenBuy] = useState(false);
  const [isUnderstand, setIsUnderstand] = useState(false);
  const [amount, setAmount] = useState(2000);
  const [purchaseProcess, setPurchaseProcess] = useState(
    "PURCHASE IN GAME TOKENS"
  );

  const { user, setUser } = useContext(UserContext) as UserContextType;

  const {
    data: tokenBalance,
    error,
    isLoading,
    isSuccess,
  } = useContractRead({
    ...CRIBXTokenContract,
    functionName: "balanceOf",
    args: [address || "0x"],
    enabled: Boolean(address),
  });

  const {
    write: callApprove,
    isLoading: isLoadingApprove,
    data: approveData,
  } = useContractWrite({
    ...CRIBXTokenContract,
    functionName: "approve",
  });
  const { isLoading: isPendingApprove, isSuccess: isSuccessApprove } =
    useWaitForTransaction({
      hash: approveData?.hash,
    });

  const {
    write: callBuy,
    isLoading: isLoadingBuy,
    data: buyData,
  } = useContractWrite({
    ...GameContract,
    functionName: "buyGameToken",
  });
  const { isLoading: isPendingBuy, isSuccess: isSuccessBuy } =
    useWaitForTransaction({
      hash: buyData?.hash,
    });

  const openBuyModal = () => {
    setIsOpenBuy(true);
  };

  const closeBuyModal = () => {
    setIsOpenBuy(false);
  };

  async function approveToken() {
    callApprove({
      args: [GameContract.address, parseEther(`${amount}`)],
    });
  }

  useEffect(() => {
    if (isLoadingApprove || isPendingApprove) {
      setPurchaseProcess("APPROVING...");
    }
  }, [isLoadingApprove, isPendingApprove]);

  useEffect(() => {
    if (isLoadingBuy || isPendingBuy) {
      setPurchaseProcess("PURCHASING...");
    }
  }, [isLoadingBuy, isPendingBuy]);

  useEffect(() => {
    if (isSuccessApprove) {
      callBuy({ args: [parseEther(`${amount}`)] });
    }
  }, [isSuccessApprove]);

  useEffect(() => {
    if (isSuccessBuy) {
      updateUser();
    }
  }, [isSuccessBuy]);

  const handlePurchaseGameTokens = async () => {
    approveToken();
  };

  async function updateUser() {
    setIsOpenBuy(false);
    const updatedUserInfo = {
      ...user,
      cash: user.cash + amount,
      isTokenPurchased: true,
    };
    setUser(updatedUserInfo);
    await axios.post(`${process.env.REACT_APP_API_URL}/updateuser`, {
      data: updatedUserInfo,
    });
  }

  return (
    <>
      {isOpenBuy && (
        <div className="fixed bg-[#aaac] z-[1] left-0 top-0 w-full h-full backdrop-blur-sm">
          <div className="relative text-center flex flex-col h-full justify-center items-center">
            <button
              onClick={closeBuyModal}
              className="absolute right-[15px] top-[10px] text-[#fff]"
            >
              X
            </button>
            <div className="text-[#f00] mb-[10px]">
              Please read carefully before proceeding
            </div>
            <div>
              You will require MATIC on Polygon chain to make in game token
              purchase
              <br />
              50% of the MATIC purchase price will automatically purchase CRI3X
              token
              <br />
              50% of the MATIC purchase price will be sent to dev wallet for
              further development of the CRIBX ecosystem
              <br />
              <span className="text-[12px]">
                CRBN is the in-game token name. Upon completion of game you can
                convert all P2E CRBN token profit into CRI3X by clicking the
                collect button on the main page
              </span>
              <br />
              The winning of tokens is on an alorithim and you are not always
              guaranteed to win
            </div>
            <div className="flex items-center text-[#fff]">
              <input
                type="checkbox"
                onChange={(e) => {
                  setIsUnderstand(e.target.checked);
                }}
              />
              <label className="ml-[10px]">I understand</label>
            </div>
            <div className="mt-[20px] flex">
              <div className="mr-[10px]">
                <div className="text-[14px] font-[600]">2000</div>
                <div className="text-[10px] leading-none tracking-tight">
                  Minimum Required Amount
                </div>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                }}
                min={2000}
                max={Number(tokenBalance)}
                className="bg-transparent border-1 border-[#000] rounded px-[5px] w-[150px] outline-none"
              />
              <div className="ml-[10px]">
                <div className="text-[14px] font-[600]">
                  {isLoading
                    ? "Loading"
                    : isSuccess
                    ? tokenBalance?.toString()
                    : 0}
                </div>
                <div className="text-[10px] leading-none tracking-tight">
                  Available Amount You Have
                </div>
              </div>
            </div>
            <button
              disabled={
                isUnderstand == false ||
                purchaseProcess != "PURCHASE IN GAME TOKENS"
              }
              onClick={handlePurchaseGameTokens}
              className="bg-[#169621] disabled:bg-[#969691] enabled:hover:bg-[#26a631] duration-300 text-[#fff] text-[16px] h-[35px] w-[250px] rounded mt-[10px]"
            >
              {purchaseProcess}
            </button>
          </div>
        </div>
      )}
      <button
        onClick={openBuyModal}
        className="bg-[#169621] text-[#fff] text-[16px] h-[35px] w-[200px] rounded"
      >
        BUY GAME TOKENS
      </button>
    </>
  );
};

export default PurchaseToken;
