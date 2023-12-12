export function randomPrice(price: any) {
  const max = price + Math.floor(price / 5);
  const min = price - Math.floor(price / 5);
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  const newPrice = rand + min;
  return newPrice;
}

export const getRandomNumber = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const key = "the_kid_game";

export const saveState = (data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getState = () => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
};

export const removeState = () => {
  localStorage.removeItem(key);
};
