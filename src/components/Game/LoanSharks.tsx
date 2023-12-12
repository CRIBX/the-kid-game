import LoanShark from "./LoanShark";
import { loanSharks } from "../../assets/data";

const LoanSharks = ({ sharkIndex, setSharkIndex }: any) => {
  return (
    <>
      {sharkIndex != null && (
        <LoanShark
          sharkIndex={sharkIndex}
          close={() => setSharkIndex(null)}
          setSharkIndex={setSharkIndex}
        />
      )}
      <div>
        <div className="text-[#fff] text-center text-[24px] mb-[15px]">
          LOAN SHARKS
        </div>
        <div className="flex flex-wrap gap-[10px]">
          {loanSharks.map((loanshark, i) => (
            <button
              className="bg-[#444] w-[94px] h-[94px] overflow-hidden"
              key={i}
              onClick={() => setSharkIndex(i)}
            >
              <img
                src={loanshark.character}
                alt="loan shark 1"
                className="object-fill"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoanSharks;
