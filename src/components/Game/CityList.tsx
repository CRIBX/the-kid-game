import { cities } from "../../assets/data";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";

interface City {
  name: string;
}

const CityList = ({ currentCity, handleMove }: any) => {
  const [hoverCity, setHoverCity] = useState<City | null>();

  return (
    <div>
      <div className="text-[#fff] text-center text-[24px] mb-[15px]">
        TRAVEL
      </div>
      <div className="flex w-full flex-col">
        {cities.map((city: any) => {
          return (
            <button
              key={city.name}
              onMouseOver={() => setHoverCity(city)}
              onMouseLeave={() => setHoverCity(null)}
              onClick={() => handleMove(city)}
              className={`relative flex items-center border-b border-[#fff3] mr-1 lg:mr-0 text-left pr-[30px] my-1 text-[#fff] hover:text-[#f00] active:text-[#ccc]`}
              disabled={city.name == currentCity.name}
            >
              <div className="text-[16px] w-[30px]">
                <FontAwesomeIcon icon={city.icon} />
              </div>
              <p className="truncate text-[14px] w-[130px]">{city.name}</p>
              {currentCity.name == city.name && (
                <FontAwesomeIcon
                  icon={faPersonWalking}
                  className="absolute top-[3px] right-0"
                />
              )}
              {city.name == hoverCity?.name && (
                <FontAwesomeIcon
                  icon={faPersonWalking}
                  className="absolute top-[3px] right-0"
                />
              )}
              {city.name == hoverCity?.name && (
                <div className="absolute -top-[70px] z-10 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700">
                  {city.name}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CityList;
