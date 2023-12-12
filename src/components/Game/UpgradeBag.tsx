import styled from "styled-components";
import { useState, useEffect } from "react";
import UpgradeFunnyPack from "../../assets/imgs/upgrade-bag-funnypack.png";
import UpgradeSportBag from "../../assets/imgs/upgrade-bag-sportbag.png";
import UpgradeShoulderBag from "../../assets/imgs/upgrade-bag-shoulderbag.png";
import UpgradeBackPack from "../../assets/imgs/upgrade-bag-backpack.png";
import UpgradePullCart from "../../assets/imgs/upgrade-bag-pullcart.png";
import {
  useAccount,
  useBalance,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { GameContract } from "../contracts";
import { parseEther } from "viem";
import axios from "axios";

const CategoryContainer = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CategoryButton = styled.button`
  width: 200px;
  height: 30px;
  background: #c44;
  color: #fff;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 14px;
  box-shadow: 2px 2px black;

  &:hover {
    background: #d55;
    transition: all 0.5s;
  }

  &:disabled {
    background: #555;
  }
`;

const UpgradeBag = ({ userInfo, setUserInfo, close }: any) => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address, watch: true });
  const [amount, setAmount] = useState(0);

  const {
    write: callPurchase,
    isLoading: isLoadingPurchase,
    data: purchaseData,
  } = useContractWrite({
    ...GameContract,
    functionName: "purchase",
    value: parseEther(`${amount}`),
  });
  const { isLoading: isPendingPurchase, isSuccess: isSuccessPurchase } =
    useWaitForTransaction({
      hash: purchaseData?.hash,
    });

  useEffect(() => {
    if (isSuccessPurchase) {
      updateUser();
    }
  }, [isSuccessPurchase]);

  const handleClickPurchase = async (amount: any) => {
    setAmount(amount);
    callPurchase(amount);
  };

  async function updateUser() {
    const updatedUserInfo = {
      ...userInfo,
      bag: { ...userInfo.bag, fill: userInfo.bag.fill + amount },
    };
    setUserInfo(updatedUserInfo);
    await axios.post(`${process.env.REACT_APP_API_URL}/updateuser`, {
      data: updatedUserInfo,
    });
  }

  return (
    <div className="fixed bg-[#caac] backdrop-blur-sm z-[2] left-0 top-0 w-full h-full flex justify-center">
      <div className="absolute top-[50px] bg-[#ccc] text-[#f00] text-center p-[10px]">
        THIS IS AN ON-CHAIN IN GAME PURCHASE. <br />
        You will require MATIC in your wallet to access this upgrade
      </div>
      <div className="flex items-center">
        <div className="flex items-start">
          <div>
            <CategoryContainer>
              <img src={UpgradeFunnyPack} alt="upgrade funny pack" />
              <CategoryButton
                onClick={() => handleClickPurchase(5)}
                disabled={balance == undefined || Number(balance) < 5}
              >
                FUNNY PACK 5 MATIC
              </CategoryButton>
            </CategoryContainer>
            <CategoryContainer>
              <img src={UpgradeSportBag} alt="upgrade sport bag" />
              <CategoryButton
                onClick={() => handleClickPurchase(50)}
                disabled={balance == undefined || Number(balance) < 50}
              >
                SPORT BAG 50 MATIC
              </CategoryButton>
            </CategoryContainer>
          </div>
          <div>
            <CategoryContainer>
              <img src={UpgradeShoulderBag} alt="upgrade shoulder bag" />
              <CategoryButton
                onClick={() => handleClickPurchase(10)}
                disabled={balance == undefined || Number(balance) < 10}
              >
                SHOULDER BAG 10 MATIC
              </CategoryButton>
            </CategoryContainer>
          </div>
          <div>
            <CategoryContainer>
              <img src={UpgradeBackPack} alt="upgrade back pack" />
              <CategoryButton
                onClick={() => handleClickPurchase(20)}
                disabled={balance == undefined || Number(balance) < 20}
              >
                BACK PACK 20 MATIC
              </CategoryButton>
            </CategoryContainer>
            <CategoryContainer>
              <img src={UpgradePullCart} alt="upgrade pull cart" />
              <CategoryButton
                onClick={() => handleClickPurchase(100)}
                disabled={balance == undefined || Number(balance) < 100}
              >
                PULL CART 100 MATIC
              </CategoryButton>
            </CategoryContainer>
          </div>
        </div>
      </div>
      <button
        onClick={close}
        className="text-[#fff] text-[48px] absolute top-[30px] right-[50px]"
      >
        X
      </button>
    </div>
  );
};

export default UpgradeBag;
