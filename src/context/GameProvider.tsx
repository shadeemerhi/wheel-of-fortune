import React, { ReactNode, useState } from "react";

interface GameContextInterface {
  gameState: GameState;
  startGame: any;
  resetGame: any;
}

const DEFAULT_GAME_STATE: GameState = {
  step: 0,
  loading: false,
  playerName: "",
  category: "Sports",
};

export const GameContext = React.createContext<GameContextInterface>({
  gameState: DEFAULT_GAME_STATE,
  startGame: null,
  resetGame: null,
});

interface GameProviderProps {
  children: ReactNode;
}

type GameState = {
  step: number;
  loading: boolean;
  playerName: string;
  category: string;
};

const GameProvider = ({ children }: GameProviderProps) => {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);

  const startGame = (playerName: string) => {
    setGameState((prev) => ({
      ...prev,
      playerName,
      step: 1,
    }));
  };

  const resetGame = () => setGameState(DEFAULT_GAME_STATE);

  const value: GameContextInterface = {
    gameState,
    startGame,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
