import HELMET_JUNK from "./imgs/junk-helmet.png";
import BOOT_JUNK from "./imgs/junk-boot.png";
import {
  faCity,
  faIndustry,
  faFishFins,
  faPersonRifle,
  faArchway,
  faWater,
  faGopuram,
  faCodeBranch,
  faTents,
  faBiohazard,
  faDumpsterFire,
  faDungeon,
} from "@fortawesome/free-solid-svg-icons";
import Loanshark_1 from "./imgs/character-loan-shark-1.png";
import Loanshark_2 from "./imgs/character-loan-shark-2.png";
import Loanshark_3 from "./imgs/character-loan-shark-3.png";
import Loanshark_4 from "./imgs/character-loan-shark-4.png";
import shark3 from "./animations/loanshark3.mp4";
import shark1 from "./animations/loanshark1.mp4";
import shark4 from "./animations/loanshark4.mp4";
import shark2 from "./animations/loanshark2.mp4";

export const cities: any = [
  {
    name: "KAPPA CITY SLUMS",
    icon: faCity,
    junks: [
      {
        id: "helmet",
        name: "Omega Military Soldier Helmet",
        price: 1000,
        image: <img src={HELMET_JUNK} alt="helmet photo" />,
      },
      {
        id: "boots",
        name: "Boots",
        price: 50,
        image: <img src={BOOT_JUNK} alt="boot photo" />,
      },
      {
        id: "radio",
        name: "Radio Transmitter",
        price: 150,
      },
      {
        id: "rifle",
        name: "Omega Forces B65 Lazer Rifle",
        price: 5000,
      },
      {
        id: "mask",
        name: "Air purifying mask",
        price: 350,
      },
      {
        id: "motherboard",
        name: "Computer motherboard",
        price: 500,
      },
      {
        id: "pants",
        name: "Military pants",
        price: 175,
      },
      {
        id: "code",
        name: "Code to see “The One who knows everything”",
        price: 10000,
      },
      {
        id: "lighter",
        name: "Lighter fluid",
        price: 25,
      },
      {
        id: "blankets",
        name: "Blankets",
        price: 75,
      },
      {
        id: "lock",
        name: "Door pad lock",
        price: 25,
      },
      {
        id: "food",
        name: "Military food pack",
        price: 20,
      },
      {
        id: "laces",
        name: "Boot laces",
        price: 5,
      },
      {
        id: "intel",
        name: "Intercepted military intel",
        price: 50000,
      },
    ],
  },
  { name: "THE FACTORIES", icon: faIndustry, junks: [] },
  { name: "FISHING DOCKS", icon: faFishFins, junks: [] },
  {
    name: "OUTSKIRTS OF OMEGA MILITARY COMPOUND",
    icon: faPersonRifle,
    junks: [],
  },
  { name: "UNDERGROUND TUNNELS", icon: faArchway, junks: [] },
  { name: "BOGGY MARSH", icon: faWater, junks: [] },
  { name: "ABANDONED BUILDING", icon: faGopuram, junks: [] },
  { name: "PAAT TUNNELS", icon: faCodeBranch, junks: [] },
  { name: "SHANTY TOWN", icon: faTents, junks: [] },
  { name: "HIDDEN NIGHTCLUB", icon: faBiohazard, junks: [] },
  { name: "JUNK YARD", icon: faDumpsterFire, junks: [] },
  { name: "REFUGEE TUNNELS", icon: faDungeon, junks: [] },
];

export const profile = {
  cash: 2000,
  debt: 5500,
  bank: 0,
  bag: { fill: 22, total: 100 },
  junks: {
    helmet: { amount: 12 },
    boots: { amount: 10 },
    radio: { amount: 0 },
    rifle: { amount: 0 },
    mask: { amount: 0 },
    motherboard: { amount: 0 },
    pants: { amount: 0 },
    code: { amount: 0 },
    lighter: { amount: 0 },
    blankets: { amount: 0 },
    lock: { amount: 0 },
    food: { amount: 0 },
    laces: { amount: 0 },
    intel: { amount: 0 },
  },
};

export const loanSharks = [
  {
    id: 1,
    name: "Loan Shark 1",
    rate: 15,
    amount: 7500,
    character: Loanshark_1,
    limit: 1,
    animation: shark1,
    damage: 90,
  },
  {
    id: 2,
    name: "Loan Shark 2",
    rate: 10,
    amount: 5500,
    character: Loanshark_2,
    limit: 2,
    animation: shark2,
    damage: 90,
  },
  {
    id: 3,
    name: "Loan Shark 3",
    rate: 20,
    amount: 8500,
    character: Loanshark_3,
    limit: 4,
    animation: shark3,
    damage: 90,
  },
  {
    id: 4,
    name: "Loan Shark 4",
    rate: 30,
    amount: 9500,
    character: Loanshark_4,
    limit: 3,
    animation: shark4,
    damage: 90,
  },
];
