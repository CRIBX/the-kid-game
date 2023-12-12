import { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig, useAccount } from "wagmi";
import { chains, config } from "./wagmi";
import { gameService } from "./utils/api";
import Home from "./pages/Home";
import Header from "./components/Header";
import UserContextProvider from "./contexts/UserContext";
import Game from "./pages/Game";

export function App() {
  const { address } = useAccount();
  const [player, setPlayer] = useState(false);

  useEffect(() => {
    fetchPlayer();
  }, []);

  async function fetchPlayer() {
    const res = await gameService.getPlayer({
      wallet: address,
    });
    setPlayer(res);
  }

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <UserContextProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home player={player} />} />
              <Route path="/game" element={<Game />} />
            </Routes>
          </Router>
        </UserContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
