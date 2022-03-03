import React, { ReactNode, useState } from "react";
import { Category, GameContextInterface, GameState } from "../util/gameTypes";
import { CATEGORIES, WHEEL_VALUES } from "../util/staticData";

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
  onSpinComplete: null,
});

interface GameProviderProps {
  children: ReactNode;
}

const GameProvider = ({ children }: GameProviderProps) => {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const wheelPartitions = Object.keys(WHEEL_VALUES).length;
  const wheelZoneSize = 360 / wheelPartitions;

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
      step: 2,
    }));
  };

  const onSpinComplete = (relativeDegree: number) => {
    const spinWheelValue = Math.ceil(relativeDegree / wheelZoneSize);
    console.log(
      "HERE IS SPIN WHEEL VALUE",
      spinWheelValue,
      WHEEL_VALUES[spinWheelValue as number]
    );
  };

  const value: GameContextInterface = {
    gameState,
    startGame,
    resetGame,
    selectCategory,
    onSpinComplete,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
