import React, { ReactNode, useState } from "react";
import { Category, GameContextInterface, GameState } from "../util/gameTypes";
import { CATEGORIES } from "../util/staticData";

const DEFAULT_GAME_STATE: GameState = {
  step: 0,
  loading: false,
  playerName: "",
  category: CATEGORIES[0],
};

export const GameContext = React.createContext<GameContextInterface>({
  gameState: DEFAULT_GAME_STATE,
  startGame: null,
  resetGame: null,
  selectCategory: null,
});

interface GameProviderProps {
  children: ReactNode;
}

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

  const selectCategory = (category: Category) => {
    setGameState((prev) => ({
      ...prev,
      category,
    }));
  };

  const value: GameContextInterface = {
    gameState,
    startGame,
    resetGame,
    selectCategory,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
