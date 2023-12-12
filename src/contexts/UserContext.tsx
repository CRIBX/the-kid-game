import { useState, createContext } from "react";

export interface LoanType {
  id: number;
  amount: number;
  backBlock: number;
}

export interface LoanSharkDebt {
  debt: number;
}

export interface ItemType {}

export interface JunkType {
  amount?: number;
  price: number;
  id: number;
  name: string;
}

export interface BagType {
  total: number;
  fill: number;
}

export interface User {
  cash: number;
  debt: number;
  loans: Array<LoanType>;
  days: number;
  bank: number;
  items: Array<ItemType>;
  life: number;
  junks: Array<JunkType>;
  bag: BagType;
}

export type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({ children }: any) {
  const [user, setUser] = useState<User>({
    cash: 0,
    debt: 0,
    days: 0,
    loans: [],
    bank: 0,
    items: [],
    life: 0,
    junks: [],
    bag: { total: 0, fill: 0 },
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
