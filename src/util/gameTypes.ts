export type GameState = {
  step: number;
  loading: boolean;
  playerName: string;
  category: Category;
  wheelState: {
    isSpinning: boolean;
    absoluteDegree: number;
    relativeDegree: number;
  };
  spinAmount: number;
};

export type Category = {
  displayText: string;
  emoji: string;
  categoryId: number;
};

export interface GameContextInterface {
  gameState: GameState;
  startGame: any;
  resetGame: any;
  selectCategory: any;
  onSpinStart: any;
  onSpinComplete: any;
}
