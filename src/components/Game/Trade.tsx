import styled from "styled-components";
import { useState, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import { userService } from "../../utils/api";
import JunkConfirmDlg from "./JunkConfirm";

interface ButtonProp {
  hoverColor: string;
}

const Button = styled.button<ButtonProp>`
  border-radius: 50%;
  background-color: ${(props) => props.color};
  width: 50px;
  height: 50px;
  color: #fff;
  line-height: 0.9;

  &:hover {
    background-color: ${(props) => props.hoverColor};
    transition: all 0.3s;
  }

  &:disabled {
    background-color: #555;
    color: #777;
    border: none;
  }
`;

const Trade = ({ junkToTrade, close, isIncrease }: any) => {
  const [openConfirmBuy, setOpenConfirmBuy] = useState(false);
  const [openCofirmSell, setOpenConfirmSell] = useState(false);

  const { user, setUser } = useContext(UserContext) as UserContextType;

  const maxAmount = Math.max(
    Math.min(
      user.bag.total - user.bag.fill,
      Math.floor(user.cash / junkToTrade.price)
    ),
    user.junks[junkToTrade.id].amount
  );
  const [amount, setAmount] = useState(maxAmount);

  function handleChangeAmount(e: any) {
    setAmount(e.target.value);
  }

  function Model(props: any) {
    const { scene } = useGLTF("silver_strike_estoc.glb");
    return <primitive object={scene} {...props} />;
  }

  const handleBuyClick = async () => {
    const updatedCash = user.cash - amount * junkToTrade.price;
    const updatedAmount =
      Number(user.junks[junkToTrade.id].amount) + Number(amount);
    const updatedUserInfo = {
      ...user,
      cash: updatedCash,
      bag: {
        ...user.bag,
        fill: Number(user.bag.fill) + Number(amount),
      },
      junks: { ...user.junks, [junkToTrade.id]: { amount: updatedAmount } },
    };
    setUser(updatedUserInfo);
    await userService.update({ data: updatedUserInfo });
    close();
  };

  const handleSellClick = async () => {
    const updatedCash = user.cash + amount * junkToTrade.price;
    const updatedAmount =
      Number(user.junks[junkToTrade.id].amount) - Number(amount);
    const updatedUserInfo = {
      ...user,
      cash: updatedCash,
      bag: {
        ...user.bag,
        fill: Number(user.bag.fill) - Number(amount),
      },
      junks: { ...user.junks, [junkToTrade.id]: { amount: updatedAmount } },
    };
    setUser(updatedUserInfo);
    await userService.update({ data: updatedUserInfo });
    close();
  };

  return (
    <>
      {openConfirmBuy && (
        <JunkConfirmDlg
          onClose={() => {
            setOpenConfirmBuy(false);
          }}
          onOk={handleBuyClick}
          text={`Will you buy ${amount} items?`}
        />
      )}
      {openCofirmSell && (
        <JunkConfirmDlg
          onClose={() => {
            setOpenConfirmSell(false);
          }}
          onOk={handleSellClick}
          text={`Will you sell ${amount} items?`}
        />
      )}

      <div className="fixed bg-[#caac] backdrop-blur-sm z-[1] left-0 top-0 w-full h-full flex justify-center">
        <div
          className={`absolute top-[20px] text-[#fff] text-[32px] ${
            isIncrease ? "bg-[#922]" : "bg-[#292]"
          } px-[20px] border-2 border-[#000]`}
        >
          {junkToTrade.price} CRBN {isIncrease ? "↑" : "↓"}
        </div>
        <div
          className={`absolute top-[100px] text-[#000] text-[20px]} px-[20px] border-0 border-[#000]`}
        >
          Owned: {user.junks[junkToTrade.id].amount} items
        </div>
        <div
          className={`absolute top-[120px] text-[#000] text-[20px]} px-[20px] border-0 border-[#000]`}
        >
          Available: {maxAmount} items
        </div>
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ fav: 45 }}
          style={{ position: "absolute" }}
          className="touch-none"
        >
          <PresentationControls
            speed={1.5}
            global
            zoom={0.5}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment={null}>
              <Model scale={0.01} />
            </Stage>
          </PresentationControls>
        </Canvas>
        <button
          onClick={close}
          className="text-[#fff] text-[48px] absolute top-[30px] right-[50px]"
        >
          X
        </button>
        <div className="absolute bottom-[30px] flex flex-col items-center">
          <div>
            <input
              onChange={handleChangeAmount}
              type="number"
              value={amount}
              min={1}
              className="w-[50px] pl-[5px] border-1 border-[#000] rounded"
            />
          </div>
          <div className="flex">
            <Button
              onClick={() => {
                setOpenConfirmBuy(true);
              }}
              color="#28a745"
              hoverColor="#38b755"
              className="border-2 border-[#189735]"
              disabled={maxAmount < amount || amount == 0}
            >
              <div className="text-[20px]">+</div>
              <div className="text-[14px]">BUY</div>
            </Button>
            <input
              type="range"
              value={amount}
              max={maxAmount}
              min={1}
              onChange={handleChangeAmount}
              className="mx-[20px] w-[200px]"
            />
            <Button
              onClick={() => {
                setOpenConfirmSell(true);
              }}
              color="#dc3545"
              hoverColor="#ec4555"
              className="border-2 border-[#cc2535]"
              disabled={
                user.junks[junkToTrade.id].amount < amount || amount == 0
              }
            >
              <div className="text-[20px]">+</div>
              <div className="text-[14px]">SELL</div>
            </Button>
          </div>
          <div className="bg-[#fff] px-[5px] border-1 border-[#000] rounded">
            {junkToTrade.price * amount}/{user.cash} CRBN
          </div>
        </div>
      </div>
    </>
  );
};

export default Trade;
