export type GameState = {
  step: number;
  loading: boolean;
  error: string;
  playerName: string;
  category: Category;
  wheelState: {
    isSpinning: boolean;
    absoluteDegree: number;
    relativeDegree: number;
  };
  spinAmount: number;
  question: Question | null;
  providedAnswer: string;
  unknown: boolean;
  isCorrect: boolean;
  multipleChoice?: string[];
};

export type Category = {
  displayText: string;
  emoji: string;
  categoryId: number;
};

export type Question = {
  category: string;
  question: string;
  type: "boolean" | "multiple";
  difficulty: "easy" | "medium" | "hard";
  correct_answer: string;
  incorrect_answers: string[];
};

export interface GameContextInterface {
  gameState: GameState;
  startGame: any;
  resetGame: any;
  playAgain: any;
  setStep: any;
  selectCategory: any;
  onSpinStart: any;
  onSpinComplete: any;
  submitAnswer: any;
  createMultipleChoice: any;
}
