import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import axios from "axios";

const GameOver = ({ close, score }: any) => {
  const navigate = useNavigate();
  const { address } = useAccount();

  const handleClickNewGame = async () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/newuser`, { wallet: address })
      .then((response) => {
        if (response.status == 200) {
          navigate("/game");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="fixed bg-[#3339] backdrop backdrop-blur z-10 left-0 top-0 w-full h-full flex justify-center items-center">
      <div className="bg-[#020618] px-5 py-5 flex flex-col items-center rounded">
        <div className="text-[#ff3a31] text-[24px] font-[Glitch] tracking-widest text-center leading-none mb-[30px]">
          Game Over
        </div>
        <div className="text-[#fff]">Your score is</div>
        <div className="text-[#fff] font-[600] text-[20px] mb-[20px]">
          {score}
        </div>
        <button
          className={`border-1 border-[#075] hover:bg-[#075] active:bg-[#053] duration-500 text-[#fff] w-[150px] h-[40px] mb-[10px]`}
          onClick={handleClickNewGame}
        >
          New Game
        </button>
        <button
          onClick={() => navigate("/")}
          className="border-1 border-[#730] hover:bg-[#730] active:bg-[#510] duration-500 text-[#fff] w-[150px] h-[40px]"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default GameOver;
