export type GameState = {
  step: number;
  loading: boolean;
  playerName: string;
  category: Category;
  // wheelState: {
  //   isSpinning: boolean;
  //   spinDegree: number;
  //   trueDegree: number;
  // };
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
  onSpinComplete: any;
}
