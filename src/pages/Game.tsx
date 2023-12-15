import styled from "styled-components";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneArrival, faFaceAngry } from "@fortawesome/free-solid-svg-icons";
import {
  JunkType,
  LoanSharkDebt,
  UserContext,
  UserContextType,
} from "../contexts/UserContext";
import { gameService, userService } from "../utils/api";
import {
  randomPrice,
  getState,
  saveState,
  getRandomNumber,
} from "../utils/game";
import { cities, loanSharks } from "../assets/data";
import startupVideo from "../assets/animations/startup.mp4";
import EXIT_ICON from "../assets/imgs/icon-exit.png";
import Event from "../components/Game/Event";
import Profile from "../components/Game/Profile";
import CityList from "../components/Game/CityList";
import GameOver from "../components/Game/Over";
import PoliceModal from "../components/Game/PoliceModal";
import Title from "../components/Typo/Title";
import Footer from "../components/Footer";
import LoanSharks from "../components/Game/LoanSharks";
import PurchaseToken from "../components/Game/PurchaseToken";
import JunkList from "../components/Game/JunkList";
import Days from "../components/Game/Days";
import Bag from "../components/Game/Bag";
import Upgrade from "../components/Game/Upgrade";
import OldLady from "../components/Game/OldLady";
import LoanSharkDebtDlg from "../components/Game/LoanSharkDebt";

export const NavButton = styled.button`
  color: #fff;
  background-color: #2397f6;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #fff;
  transition: all 0.5s;

  &:hover {
    background-color: #34a8f7;
  }

  &:active {
    background-color: #1286e5;
  }
`;

const Game = () => {
  const { address } = useAccount();
  const [currentCity, setCurrentCity] = useState(cities[0]);
  const [event, setEvent] = useState(0);
  const [junks, setJunks] = useState<Array<JunkType>>();
  const [cheapestJunk, setCheapestJunk] = useState("");
  const [lastJunks, setLastJunks] = useState<Array<JunkType>>();
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPolice, setIsPolice] = useState(false);
  const [tip, setTip] = useState(0);
  const [isTravelShow, setIsTravelShow] = useState(false);
  const [isLoanSharksShow, setIsLoanSharksShow] = useState(false);
  const [sharkIndex, setSharkIndex] = useState<number | null>(null);
  const [isShowBank, setIsShowBank] = useState(false);
  const [loanSharkDebt, setLoanSharkDebt] = useState<LoanSharkDebt>();
  const [openLoanDebt, setOpenLoanDebt] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const videoRef: any = useRef();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const { user, setUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    const demoParam = searchParams.get("demo");
    if (demoParam === "true") {
      setShowDemo(true);
    }
    initUserInfo();
    getJunks();
    const gameState = getState();
    setIsPolice(!!gameState?.isPolice ? gameState?.isPolice : false);
    setTip(!!gameState?.tip ? gameState?.tip : 0);
  }, []);

  const handlePops = useCallback(() => {
    if (isPolice || !!tip || sharkIndex != null) return;
    const random = Math.random();

    // set 1/4 chance for cop
    if (random <= 1 / 4) {
      setIsPolice(true);
      let gameState = getState();
      gameState = { ...gameState, isPolice: true };
      saveState(gameState);
      return;
    }

    if (random <= 1 / 4 + 1 / 3) {
      const tip = getRandomNumber(1, 3);
      setTip(tip);
      let gameState = getState();
      gameState = { ...gameState, tip: tip };
      saveState(gameState);
      return;
    }
    // other
  }, [isPolice, tip, sharkIndex]);

  // handle police appearance
  useEffect(() => {
    const interval = setInterval(() => {
      handlePops();
    }, 600000);
    return () => clearInterval(interval);
  }, [handlePops]);

  // click debt
  const handleDebtClick = () => {
    if (user.loans.length === 0) return;
    let minBlock = user.loans[0].backBlock;
    let index = loanSharks.findIndex((shark) => shark.id === user.loans[0].id);
    for (let i = 1; i < user.loans.length; i++) {
      if (minBlock > user.loans[i].backBlock) {
        index = loanSharks.findIndex((shark) => shark.id === user.loans[i].id);
        minBlock = user.loans[i].backBlock;
      }
    }
    setSharkIndex(index);
  };

  // chase loanshark debt
  useEffect(() => {
    user?.loans.forEach((loan) => {
      if (user.days >= loan.backBlock) {
        setLoanSharkDebt({
          ...loanSharks[loan.id - 1],
          debt: loan.amount,
        });
        setOpenLoanDebt(true);
      }
    });
  }, [user]);

  async function getJunks() {
    const gameState = getState();
    if (!gameState?.junks) {
      const res = await gameService.getJunks();
      setJunks(res);
    } else {
      setJunks(gameState.junks);
    }
    if (!!gameState?.lastJunks) {
      setLastJunks(gameState.lastJunks);
    }
    if (!!gameState?.city) {
      setCurrentCity(gameState.city);
    } else {
      setCurrentCity(cities[0]);
    }
  }

  async function initUserInfo() {
    const res = await gameService.getPlayer({ wallet: address });
    setUser(res);
  }

  function generateRandomPrice() {
    const tempBuffer: Array<JunkType> = [];
    let cheapset;
    let discountedAmount1 = 0;
    let discountedAmount2 = 0;
    if (junks) {
      for (let i = 0; i < junks.length; i++) {
        const newPrice = randomPrice(junks[i].price);
        discountedAmount1 = (junks[i].price || 0) - newPrice;
        tempBuffer.push({
          id: junks[i].id,
          name: junks[i].name,
          price: newPrice,
        });
        if (discountedAmount1 > discountedAmount2) {
          setCheapestJunk(junks[i].name || "");
          discountedAmount2 = discountedAmount1;
        }
      }
    }
    // save game state
    let gameState = getState();
    if (!!gameState?.city) {
      setCurrentCity(gameState.city);
    } else {
      setCurrentCity(cities[0]);
    }
    gameState = { ...gameState, junks: tempBuffer, lastJunks: junks };
    saveState(gameState);
    //
    setLastJunks(junks);
    setJunks(tempBuffer);
  }

  const handleMove = async (city: any) => {
    setIsTravelShow(false);
    generateRandomPrice();
    if (user.days >= 29) {
      setIsGameOver(true);
      await gameService.over({
        wallet: address,
        score: user.cash + user.bank - user.debt * 2,
      });
    } else {
      setCurrentCity(city);
      let gameState = getState();
      gameState = { ...gameState, city: city };
      saveState(gameState);
      let updatedDebt = 0;
      const updatedLoans = [];
      for (let i = 0; i < user.loans.length; i++) {
        const newAmount =
          (user.loans[i].amount *
            (100 + loanSharks[user.loans[i].id - 1].rate)) /
          100;
        updatedDebt += Math.floor(newAmount);
        updatedLoans.push({
          id: user.loans[i].id,
          amount: Math.floor(newAmount),
          backBlock: user.loans[i].backBlock,
        });
      }
      const updatedUserInfo = {
        ...user,
        days: user.days + 1,
        debt: updatedDebt,
        bank: Math.floor(user.bank * 1.02),
        loans: updatedLoans,
      };
      setUser(updatedUserInfo);
      await userService.update({
        data: updatedUserInfo,
      });
      // Generate event
      let rand = Math.random();
      if (rand <= 1 / 4) {
        setIsPolice(true);
        return;
      } else if (rand <= 1 / 4 + 1 / 3) {
        setTip(getRandomNumber(1, 3));
      }
    }
  };

  const closePolice = () => {
    setIsPolice(false);
    let gameState = getState();
    gameState = { ...gameState, isPolice: false };
    saveState(gameState);
  };

  const closeTip = () => {
    setTip(0);
    let gameState = getState();
    gameState = { ...gameState, tip: 0 };
    saveState(gameState);
  };

  useEffect(() => {
    if (!!videoRef.current) {
      videoRef.current.addEventListener("play", handleVideo);
    }
  }, [videoRef]);

  const handleVideo = useCallback(() => {
    videoRef.current.muted = false;
    setTimeout(() => {
      if (showDemo) {
        navigate("/game");
        setShowDemo(false);
      }
    }, 77000);
  }, [showDemo]);

  return (
    <div
      style={{
        backgroundImage: `url("/city_bg/${currentCity.name.replace(
          /\s/g,
          ""
        )}.png")`,
        backgroundSize: "cover",
      }}
      className="pt-[100px] py-[20px] min-h-screen flex flex-col items-center"
    >
      {showDemo && (
        <div
          onClick={() => {
            navigate("/game");
            setShowDemo(false);
          }}
          className="fixed h-screen w-screen top-0 left-0 z-20 bg-black"
        >
          <video
            ref={videoRef}
            onLoadedData={handleVideo}
            autoPlay
            muted
            loop
            className="w-screen h-screen"
          >
            <source src={startupVideo} type="video/mp4" />
          </video>
          <div className="absolute z-30 top-10 right-12 text-white text-2xl">
            Click to escape
          </div>
        </div>
      )}
      <LoanSharkDebtDlg
        open={openLoanDebt}
        close={() => setOpenLoanDebt(false)}
        loanShark={loanSharkDebt}
      />
      <Title />
      {isGameOver && <GameOver score={user.cash + user.bank - user.debt * 2} />}
      {event != 0 && (
        <Event
          cheapestJunk={cheapestJunk}
          city={currentCity}
          event={event}
          close={() => setEvent(0)}
        />
      )}
      {isPolice && <PoliceModal close={closePolice} isOpen={isPolice} />}
      {tip !== 0 && <OldLady tip={tip} city={currentCity} close={closeTip} />}
      <div className="w-full h-full lg:w-[1024px] flex flex-col items-center">
        <div className="w-full p-2">
          <Link to="/">
            <button className="flex items-center hover:animate-pulse">
              <img src={EXIT_ICON} alt="exit" className="w-[20px]" />
              <div className="text-[#231f20] font-[600] ml-1">Exit</div>
            </button>
          </Link>
        </div>
        <div className="flex w-full">
          <div className="relative lg:hidden flex flex-col gap-[10px] pl-[10px]">
            <NavButton
              onClick={() => {
                setIsTravelShow(!isTravelShow);
                setIsLoanSharksShow(false);
              }}
            >
              <FontAwesomeIcon icon={faPlaneArrival} />
            </NavButton>
            <NavButton
              onClick={() => {
                setIsTravelShow(false);
                setIsLoanSharksShow(!isLoanSharksShow);
              }}
            >
              <FontAwesomeIcon icon={faFaceAngry} />
            </NavButton>
            <Upgrade
              setIsTravelShow={setIsTravelShow}
              setIsLoanSharksShow={setIsLoanSharksShow}
            />
            {isTravelShow && (
              <div className="absolute left-[70px] top-0 bg-[#666] px-[10px] rounded z-10">
                <CityList currentCity={currentCity} handleMove={handleMove} />
              </div>
            )}
            {isLoanSharksShow && (
              <div className="absolute left-[70px] top-0 bg-[#666] px-[10px] pb-[10px] rounded z-10">
                <LoanSharks
                  sharkIndex={sharkIndex}
                  setSharkIndex={setSharkIndex}
                />
              </div>
            )}
          </div>
          <div className="w-[200px] hidden lg:block">
            <Days />
            <CityList currentCity={currentCity} handleMove={handleMove} />
          </div>
          <div className="w-full lg:w-[600px] px-[24px] flex flex-col items-center">
            {
              // health bar
              !!user && (
                <div className="w-[150px] h-[20px] bg-[#fff] mb-[40px]">
                  <div
                    className={`h-[20px] bg-[#f00]`}
                    style={{ width: (user.life / 100) * 150 + "px" }}
                  />
                  <div className="font-[BakbakOne] text-[#aab] text-center">
                    HP {user?.life}
                  </div>
                </div>
              )
            }
            <Profile
              isShowBank={isShowBank}
              setIsShowBank={setIsShowBank}
              handleDebtClick={handleDebtClick}
            />
            <div className="mt-[30px]">
              <PurchaseToken />
            </div>
            <div className="text-[#fff] mt-[30px] text-[24px]">
              {currentCity.name}
            </div>
            {user == null ? (
              <div>Loading...</div>
            ) : (
              <>
                <JunkList junks={junks} lastJunks={lastJunks} />
              </>
            )}
          </div>
          <div className="w-[200px] hidden lg:block">
            <Bag />
            <Upgrade />
            <LoanSharks sharkIndex={sharkIndex} setSharkIndex={setSharkIndex} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Game;
