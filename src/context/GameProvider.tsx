import React, { ReactNode, useState } from "react";

interface GameContextInterface {
  gameState: GameState;
}

export const GameContext = React.createContext<GameContextInterface>({});

interface GameProviderProps {
  children: ReactNode;
}

type GameState = {
  category: string;
};

const DEFAULT_GAME_STATE: GameState = {
  category: "Sports",
};

const GameProvider = ({ children }: GameProviderProps) => {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);

  const value: GameContextInterface = {
    gameState,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
