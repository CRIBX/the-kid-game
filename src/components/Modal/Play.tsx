import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { userService } from "../../utils/api";
import LOGO from "../../assets/imgs/logo.png";

const PlayModal = ({ close, player }: any) => {
  const navigate = useNavigate();
  const { address } = useAccount();

  const handleClickNewGame = async () => {
    try {
      await userService.newUser({ wallet: address });
      navigate("/game?demo=true");
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickContinue = async () => {
    navigate("/game");
  };

  return (
    <div className="fixed bg-[#3339] backdrop backdrop-blur z-10 left-0 top-0 w-full h-full flex justify-center items-center">
      <div className="bg-[#020618] px-5 py-5 flex flex-col items-center rounded">
        <img src={LOGO} alt="logo" className="w-[90px]" />
        <div className="text-[#c85ab1] text-[24px] font-[Glitch] tracking-widest text-center leading-none mb-[30px]">
          THE KID Game
        </div>
        <button
          className={`border-1 border-[#075] hover:bg-[#075] active:bg-[#053] duration-500 text-[#fff] w-[150px] h-[40px] mb-[10px]`}
          onClick={handleClickNewGame}
        >
          New Game
        </button>
        <button
          className={`border-1 enabled:border-[#057] disabled:border-[#013] enabled:hover:bg-[#057] enabled:active:bg-[#035] duration-500 enabled:text-[#fff] disabled:text-[#013] w-[150px] h-[40px] mb-[10px]`}
          onClick={handleClickContinue}
          disabled={player == null || player == "" || player?.days == 30}
        >
          Continue
        </button>
        <button
          onClick={close}
          className="border-1 border-[#730] hover:bg-[#730] active:bg-[#510] duration-500 text-[#fff] w-[150px] h-[40px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PlayModal;
