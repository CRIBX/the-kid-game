import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGun } from "@fortawesome/free-solid-svg-icons";
import UpgradeCategory from "./UpgradeCategory";
import UpgradeBag from "./UpgradeBag";
import { NavButton } from "../../pages/Game";

const Upgrade = ({ setIsTravelShow, setIsLoanSharksShow }: any) => {
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false);
  const [category, setCategory] = useState(0);

  return (
    <>
      {isOpenUpgrade && (
        <UpgradeCategory
          close={() => setIsOpenUpgrade(false)}
          setCategory={setCategory}
        />
      )}
      {category == 1 && <UpgradeBag close={() => setCategory(0)} />}
      <div className="flex justify-center mb-[30px]">
        <NavButton
          className="lg:hidden"
          onClick={() => {
            setIsTravelShow(false);
            setIsLoanSharksShow(false);
            setIsOpenUpgrade(true);
          }}
        >
          <FontAwesomeIcon icon={faGun} />
        </NavButton>
        <button
          className="bg-[#f33] hover:bg-[#f44] duration-300 rounded text-[#fff] w-[150px] h-[40px] hidden lg:block"
          onClick={() => setIsOpenUpgrade(true)}
        >
          UPGRADE
        </button>
      </div>
    </>
  );
};

export default Upgrade;
