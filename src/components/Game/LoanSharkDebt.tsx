import { useContext } from "react";
import { userService } from "../../utils/api";
import { getRandomNumber } from "../../utils/game";
import { UserContext, UserContextType } from "../../contexts/UserContext";

const LoanSharkDebtDlg = ({ loanShark, open, close }: any) => {
  const { user, setUser } = useContext(UserContext) as UserContextType;
  const handlePay = async () => {
    const updatedCash = Number(user.cash) - Number(loanShark.debt);
    const updatedDebt = Number(user.debt) - Number(loanShark.debt);
    const updatedLoans = user.loans;
    const index = updatedLoans.findIndex((loan) => loan.id == loanShark.id);
    if (index !== -1) {
      updatedLoans.splice(index, 1);
    }

    const updatedUserInfo = {
      ...user,
      cash: updatedCash,
      debt: updatedDebt,
      loans: updatedLoans,
    };

    await userService.update({
      data: updatedUserInfo,
    });
    setUser(updatedUserInfo);
    close();
  };

  const handleRefuse = async () => {
    const damage = (user.life * getRandomNumber(5, 50)) / 100;
    const newLife = user.life - damage;
    const updatedLoans = user.loans;
    const index = updatedLoans.findIndex((loan) => loan.id == loanShark.id);
    if (index !== -1) {
      updatedLoans[index] = {
        ...updatedLoans[index],
        backBlock: user.days + loanShark.limit,
      };
    }
    await userService.update({
      data: {
        ...user,
        life: newLife,
        loans: updatedLoans,
      },
    });
    setUser({ ...user, life: newLife, loans: updatedLoans });
    close();
  };
  return (
    open && (
      <div className="fixed h-screen w-screen bg-gray-500/50 z-[1] left-0 top-0 flex justify-center items-center">
        <div className="relative lg:w-[500px] bg-[#020618] w-screen">
          <img
            src={loanShark.character}
            className="bg-[#000] w-[90px] absolute top-[-50px] left-1/2 translate-x-[-50%] rounded-full border-4 border-[#020618]"
          />
          <div className="flex items-center justify-center h-[200px] text-white text-xl">
            {`${loanShark.name} wants to pay ${loanShark.debt}.`}
          </div>
          <div className="flex lg:justify-end justify-center gap-2 p-3">
            <button onClick={handlePay}>Pay</button>
            <button onClick={handleRefuse}>Refuse</button>
          </div>
        </div>
      </div>
    )
  );
};

export default LoanSharkDebtDlg;
