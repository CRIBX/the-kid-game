import styled from "styled-components";
import { useState } from "react";
import UpgradeBag from "../../assets/imgs/upgrade-bag.png";
import UpgradeDays from "../../assets/imgs/upgrade-days.png";
import UpgradeDefense from "../../assets/imgs/upgrade-defense.png";
import UpgradeLife from "../../assets/imgs/upgrade-life.png";
import UpgradeWeapon from "../../assets/imgs/upgrade-weapon.png";

const CategoryContainer = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CategoryButton = styled.button`
  width: 150px;
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
`;

const CategoryDetail = styled.div`
  position: absolute;
  top: 50px;
  left: 25px;
  width: 200px;
  background: #f6d470;
  padding: 5px 10px;
  line-height: 1.2;
  font-size: 13px;
`;

const UpgradeCategory = ({ close, setCategory }: any) => {
  const [detailShow, setDetailShow] = useState(0);

  return (
    <div className="fixed bg-[#caac] backdrop-blur-sm z-[1] left-0 top-0 w-full h-full flex justify-center">
      <div className="flex items-center">
        <div>
          <CategoryContainer>
            <img
              src={UpgradeBag}
              alt="upgrade bag"
              onMouseOver={() => setDetailShow(1)}
              onMouseLeave={() => setDetailShow(0)}
            />
            <CategoryButton
              onMouseOver={() => setDetailShow(1)}
              onMouseLeave={() => setDetailShow(0)}
              onClick={() => setCategory(1)}
            >
              UPGRADE BAG
            </CategoryButton>
            {detailShow == 1 && (
              <CategoryDetail
                onMouseOver={() => setDetailShow(1)}
                onMouseLeave={() => setDetailShow(0)}
              >
                You can earn more tokens by upgrading your bag to hold more
                junks to buy and sell
              </CategoryDetail>
            )}
          </CategoryContainer>
          <CategoryContainer>
            <img
              src={UpgradeDays}
              alt="upgrade days"
              onMouseOver={() => setDetailShow(2)}
              onMouseLeave={() => setDetailShow(0)}
            />
            <CategoryButton
              onMouseOver={() => setDetailShow(2)}
              onMouseLeave={() => setDetailShow(0)}
            >
              UPGRADE DAYS
            </CategoryButton>
            {detailShow == 2 && (
              <CategoryDetail
                onMouseOver={() => setDetailShow(2)}
                onMouseLeave={() => setDetailShow(0)}
              >
                You can buy yourself more time to trade and earn tokens by
                extending game play
              </CategoryDetail>
            )}
          </CategoryContainer>
        </div>
        <div>
          <CategoryContainer>
            <img
              src={UpgradeDefense}
              alt="upgrade defense"
              onMouseOver={() => setDetailShow(3)}
              onMouseLeave={() => setDetailShow(0)}
            />
            <CategoryButton
              onMouseOver={() => setDetailShow(3)}
              onMouseLeave={() => setDetailShow(0)}
            >
              UPGRADE DEFENSE
            </CategoryButton>
            {detailShow == 3 && (
              <CategoryDetail
                onMouseOver={() => setDetailShow(3)}
                onMouseLeave={() => setDetailShow(0)}
              >
                You can better your chances of surviving an attack from the
                Omega Forces Dark Army by upgrading your defense
              </CategoryDetail>
            )}
          </CategoryContainer>
        </div>
        <div>
          <CategoryContainer>
            <img
              src={UpgradeLife}
              alt="upgrade life"
              onMouseOver={() => setDetailShow(4)}
              onMouseLeave={() => setDetailShow(0)}
            />
            <CategoryButton
              onMouseOver={() => setDetailShow(4)}
              onMouseLeave={() => setDetailShow(0)}
            >
              UPGRADE LIFE BAR
            </CategoryButton>
            {detailShow == 4 && (
              <CategoryDetail
                onMouseOver={() => setDetailShow(4)}
                onMouseLeave={() => setDetailShow(0)}
              >
                You can better your chances of surviving an attack from the
                Omega Forces Dark Army by upgrading your life bar
              </CategoryDetail>
            )}
          </CategoryContainer>
          <CategoryContainer>
            <img
              src={UpgradeWeapon}
              alt="upgrade weapon"
              onMouseOver={() => setDetailShow(5)}
              onMouseLeave={() => setDetailShow(0)}
            />
            <CategoryButton
              onMouseOver={() => setDetailShow(5)}
              onMouseLeave={() => setDetailShow(0)}
            >
              UPGRADE WEAPON
            </CategoryButton>
            {detailShow == 5 && (
              <CategoryDetail
                onMouseOver={() => setDetailShow(5)}
                onMouseLeave={() => setDetailShow(0)}
              >
                You can better your chances of surviving an attack from the
                Omega Forces Dark Army by fighting back with a weapon
              </CategoryDetail>
            )}
          </CategoryContainer>
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

export default UpgradeCategory;
