import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import { userService } from "../../utils/api";
import Police from "../../assets/imgs/police.jpg";
import fightAnimation from "../../assets/animations/gun-anime.mp4";
import runAnimation from "../../assets/animations/run-anime.mp4";
import bribeAnimation from "../../assets/animations/bribe-anime.mp4";

const Button = styled.button`
  background-color: #006600;
  width: 80px;
  height: 35px;
  border-radius: 5px;
  color: #fff;
  line-height: 0.9;
  font-size: 14px;

  &:hover {
    background-color: #007700;
    transition: all 0.3s;
  }

  &:disabled {
    background-color: #555;
    color: #777;
    border: none;
  }
`;

const PoliceModal = ({ close, isOpen }: any) => {
  const [alert, setAlert] = useState("");
  const [policeLife, setPoliceLife] = useState(100);
  const [actionVideo, setActionVideo] = useState(runAnimation);
  const [actionPlay, setActionPlay] = useState(false);
  const [fightable, setFightable] = useState(true);
  const [enabledRun, setEnabledRun] = useState(true);
  const [enabledBribe, setEnabledBribe] = useState(true);

  const { user, setUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    if (!actionPlay) return;
    const timer = setTimeout(() => {
      setActionPlay(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [actionPlay]);

  useEffect(() => {
    setFightable(isOpen);
    setEnabledRun(isOpen);
    setEnabledBribe(isOpen);
  }, [isOpen]);

  const handleRun = async () => {
    setActionVideo(runAnimation);
    setActionPlay(true);
    setEnabledRun(false);

    let rand = Math.random();
    if (rand <= 1 / 3) {
      setAlert("You ran away successfully.");
    } else {
    }
    // if (rand <= 1 / 3) {
    // let items = [...user.items];
    // const index = Math.floor(Math.random() * items.length);
    // items.splice(index, 1);
    // const updatedUserInfo = {
    //   ...user,
    //   life: user.life - 8,
    //   items: items
    // };
    // await userService.update({data: updatedUserInfo});
    // setUser(updatedUserInfo);
    // setAlert("You lost items");
    // return;
    // } else if (rand <= 2 / 3) {
    //   setAlert("You ran away successfully.");
    //   return;
    // }
    // else {
    //   // lose money
    //   const updatedUserInfo = {
    //     ...user,
    //     cash: user.cash - Math.floor(Math.random() * user.cash > 2000 ? 2000 : user.cash),
    //     life: user.life > 20 ? 20 : user.life,
    //   };
    //   setUser(updatedUserInfo);
    //   await axios.post(`${process.env.REACT_APP_API_URL}/updateuser`, {
    //     data: updatedUserInfo,
    //   });
    //   setAlert("You lost money");
    // }
  };

  const handleFight = async () => {
    setActionVideo(fightAnimation);
    setActionPlay(true);
    let rand = Math.random();
    if (rand <= 1 / 3) {
      setAlert("You escaped successfully.");
    }
    setFightable(false);
    // else {
    //   setAlert("You lost 3000 CRBN!");
    //   const updatedUserInfo = {
    //     ...user,
    //     cash: user.cash - 3000,
    //     life: 20,
    //   };
    //   await userService.update({data: updatedUserInfo});
    //   setUser(updatedUserInfo);
    //   setFightable(false);
    // }
    // if (policeLife - Math.floor(rand * 100) <= 1) {
    //   close();
    // } else if (user.life - Math.floor(rand * 10) <= 0) {
    //   setAlert("You lost 3000 CRBN!");
    //   const updatedUserInfo = {
    //     ...user,
    //     cash: user.cash - 3000,
    //     life: 20,
    //   };
    //   setUser(updatedUserInfo);
    //   await axios.post(`${process.env.REACT_APP_API_URL}/updateuser`, {
    //     data: updatedUserInfo,
    //   });
    //   setFightable(false);
    // } else {
    //   setPoliceLife(policeLife - Math.floor(rand * 20));
    //   const updatedUserInfo = {
    //     ...user,
    //     life: user.life - Math.floor(rand * 10),
    //   };
    //   setUser(updatedUserInfo);
    //   await axios.post(`${process.env.REACT_APP_API_URL}/updateuser`, {
    //     data: updatedUserInfo,
    //   });
    //   setFightable(false);
    // }
  };

  const handleSurrender = async () => {
    if (user.items.length > 0) {
      const updatedUserInfo = {
        ...user,
        items: [],
      };
      await userService.update({ data: updatedUserInfo });
      setUser(updatedUserInfo);
      setAlert("You lost items!");
    } else if (user.cash > 2000) {
      const updatedUserInfo = {
        ...user,
        cash: user.cash - 2000,
      };
      await userService.update({ data: updatedUserInfo });
      setUser(updatedUserInfo);
      setAlert("You lost 2000 CRBN!");
    } else if (user.cash > 0 && user.cash < 2000) {
      const cash = user.cash;
      const updatedUserInfo = {
        ...user,
        cash: 0,
      };
      await userService.update({ data: updatedUserInfo });
      setUser(updatedUserInfo);
      setAlert(`You lost ${cash} CRBN!`);
    } else {
      setAlert("Hades didn't find interesting thing from you.");
    }
  };

  const handleBribe = async () => {
    setActionVideo(bribeAnimation);
    setActionPlay(true);
    const rand = Math.random();
    setEnabledBribe(false);
    if (rand <= 1 / 3) {
      const updatedUserInfo = {
        ...user,
        cash: user.cash - 500,
      };
      await userService.update({ data: updatedUserInfo });
      setUser(updatedUserInfo);
      setAlert("You lost 500 CRBN!");
    }
  };

  return !actionPlay ? (
    <div className="fixed bg-[#3339] backdrop backdrop-blur z-[9] left-0 top-0 w-full h-full flex justify-center items-center">
      <div className="w-[350px] h-[250px] relative bg-[#020618] pt-[50px] pb-[15px] px-[15px] flex flex-col items-center rounded">
        <img
          src={Police}
          alt="police"
          className="w-[90px] absolute top-[-50px] left-[50%] translate-x-[-50%] rounded-[50%] border-4 border-[#020618]"
        />
        <div className="w-full flex justify-end">
          <div>
            <div className="w-[150px] h-[10px] bg-[#fff]">
              <div
                className={`h-[10px] bg-[#f00]`}
                style={{
                  width: user?.life * 1.5 + "px",
                }}
              />
            </div>
            <div className="font-[BakbakOne] text-[#aab] text-[18px]">
              HEALTH {user?.life}/100
            </div>
          </div>
        </div>
        {alert == "" ? (
          <>
            <div className="text-[#fff] text-[20px] my-[15px]">
              Officer Hardass is chasing you!
              <br />
              What do you do?
              {policeLife != 100 && (
                <div className="text-[#bbf]">Police Health: {policeLife}</div>
              )}
            </div>
            <div className="flex gap-[5px]">
              <Button onClick={handleSurrender}>Surrender</Button>
              <Button disabled={!enabledRun} onClick={handleRun}>
                Run
              </Button>
              <Button disabled={!fightable} onClick={handleFight}>
                Fight
              </Button>
              <Button
                disabled={user?.cash < 500 || !enabledBribe}
                onClick={handleBribe}
              >
                Bribe
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-[#fff] text-[20px] my-[30px]">{alert}</div>
            <Button onClick={close}>Close</Button>
          </>
        )}
        {/* {mode == 0 && (
          <div className="flex">
            <button
              onClick={() => setMode(1)}
              className={`border-1 border-[#075] ${
                mode == 1 && "bg-[#075]"
              } hover:bg-[#075] active:bg-[#053] duration-500 flex justify-center items-center w-[70px] mr-2 h-[40px]`}
            >
              <img src={Surrender} className="w-[30px]" />
            </button>
            <button
              onClick={() => setMode(2)}
              className={`border-1 border-[#057] hover:bg-[#057] active:bg-[#035] duration-500 flex justify-center items-center w-[70px] mr-2 h-[40px]`}
            >
              <img src={Fight} className="w-[30px]" />
            </button>
            <button
              onClick={() => setMode(3)}
              className="border-1 border-[#730] hover:bg-[#730] active:bg-[#510] duration-500 flex justify-center items-center w-[70px] mr-2 h-[40px]"
            >
              <img src={Run} className="w-[30px]" />
            </button>
            <button
              onClick={() => setMode(4)}
              className="border-1 border-[#730] hover:bg-[#730] active:bg-[#510] duration-500 flex justify-center items-center w-[70px] h-[40px]"
            >
              <img src={Bribe} className="w-[30px]" />
            </button>
          </div>
        )}
        {mode == 1 && (
          <div className="flex flex-col items-center">
            <div className="text-[#f00] mb-[5px]">Are you sure surrender?</div>
            <div className="flex">
              <button
                onClick={close}
                className="mr-[5px] hover:bg-[#fff2] duration-300 border-1 border-[#fff] text-[#fff] flex justify-center items-center w-[70px] h-[30px]"
              >
                Yes
              </button>
              <button
                onClick={() => setMode(0)}
                className="border-1 hover:bg-[#fff2] border-[#fff] text-[#fff] flex justify-center items-center w-[70px] h-[30px]"
              >
                No
              </button>
            </div>
          </div>
        )}
        {mode == 2 && (
          <div className="flex flex-col items-center">
            <div className="text-[#f00] mb-[5px]">Are you sure fight?</div>
            <div className="flex">
              <button
                onClick={close}
                className="mr-[5px] hover:bg-[#fff2] duration-300 border-1 border-[#fff] text-[#fff] flex justify-center items-center w-[70px] h-[30px]"
              >
                Yes
              </button>
              <button
                onClick={() => setMode(0)}
                className="border-1 hover:bg-[#fff2] border-[#fff] text-[#fff] flex justify-center items-center w-[70px] h-[30px]"
              >
                No
              </button>
            </div>
          </div>
        )}
        {mode == 3 && (
          <div className="flex flex-col items-center">
            <div className="text-[#f00] mb-[5px]">Are you sure run?</div>
            <div className="flex">
              <button
                onClick={close}
                className="mr-[5px] hover:bg-[#fff2] duration-300 border-1 border-[#fff] text-[#fff] flex justify-center items-center w-[70px] h-[30px]"
              >
                Yes
              </button>
              <button
                onClick={() => setMode(0)}
                className="border-1 hover:bg-[#fff2] border-[#fff] text-[#fff] flex justify-center items-center w-[70px] h-[30px]"
              >
                No
              </button>
            </div>
          </div>
        )}
        {mode == 4 && (
          <div className="flex flex-col items-center">
            <div className="text-[#f00] mb-[5px]">Are you sure bribe?</div>
            <div className="flex">
              <button
                onClick={close}
                className="mr-[5px] hover:bg-[#fff2] duration-300 border-1 border-[#fff] text-[#fff] flex justify-center items-center w-[70px] h-[30px]"
              >
                Yes
              </button>
              <button
                onClick={() => setMode(0)}
                className="border-1 hover:bg-[#fff2] border-[#fff] text-[#fff] flex justify-center items-center w-[70px] h-[30px]"
              >
                No
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  ) : (
    <div className="fixed bg-[#3339] backdrop backdrop-blur z-10 left-0 top-0 w-full h-full flex justify-center items-center">
      <video autoPlay loop muted>
        <source src={actionVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default PoliceModal;
