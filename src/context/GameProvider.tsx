import React, { ReactNode, useEffect, useState } from "react";
import {
  Category,
  GameContextInterface,
  GameState,
  Question,
} from "../util/gameTypes";
import { CATEGORIES, WHEEL_VALUES } from "../util/staticData";

const DEFAULT_GAME_STATE: GameState = {
  step: 0,
  loading: false,
  error: "",
  playerName: "",
  category: CATEGORIES[0],
  wheelState: {
    isSpinning: false,
    absoluteDegree: 0,
    relativeDegree: 0,
  },
  spinAmount: 0,
  question: null,
  providedAnswer: "",
  unknown: false,
  isCorrect: false,
  multipleChoice: false,
};

export const GameContext = React.createContext<GameContextInterface>({
  gameState: DEFAULT_GAME_STATE,
  startGame: null,
  setStep: null,
  resetGame: null,
  selectCategory: null,
  onSpinStart: null,
  onSpinComplete: null,
  submitAnswer: null,
  playAgain: null,
});

interface GameProviderProps {
  children: ReactNode;
}

const GameProvider = ({ children }: GameProviderProps) => {
  console.log("GAME PROVIDER RENDERING");

  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);
  const wheelPartitions = Object.keys(WHEEL_VALUES).length;
  const wheelZoneSize = 360 / wheelPartitions;

  const startGame = (playerName: string) => {
    setGameState((prev) => ({
      ...prev,
      playerName,
    }));
    setStep(1);
  };

  const resetGame = () => setGameState(DEFAULT_GAME_STATE);

  const playAgain = () =>
    setGameState({
      ...DEFAULT_GAME_STATE,
      step: 1,
      playerName: gameState.playerName,
    });

  const flagFaultyQuestion = () => {
    // API call to update question as faulty
  };

  const selectCategory = (category: Category) => {
    setGameState((prev) => ({
      ...prev,
      category,
    }));
    setStep(2);
  };

  const onSpinStart = (absoluteDegree: number) => {
    setGameState((prev) => ({
      ...prev,
      wheelState: {
        ...prev.wheelState,
        isSpinning: true,
        absoluteDegree,
      },
    }));
  };

  const onSpinComplete = (relativeDegree: number) => {
    const spinWheelValue = Math.ceil(
      relativeDegree / wheelZoneSize
    ) as keyof typeof WHEEL_VALUES;
    const spinAmount = WHEEL_VALUES[spinWheelValue];

    setGameState((prev) => ({
      ...prev,
      wheelState: {
        ...prev.wheelState,
        isSpinning: false,
        relativeDegree,
      },
      spinAmount,
    }));
  };

  const fetchQuestion = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${gameState.category.categoryId}&difficulty=easy`
      );
      const data = await response.json();

      const { results }: { results: Question[] } = data;
      if (data.response_code !== 0) {
        throw new Error("Error fetching results");
      }

      if (!results.length) {
        throw new Error("No results");
      }

      console.log("HERE IS DATA", data);

      const questions = results.filter(
        (question) => question.type !== "boolean"
      );

      const randomIndex = Math.floor(Math.random() * questions.length);
      console.log("HERE ARE QUESTION OPTIONS", questions);
      setGameState((prev) => ({
        ...prev,
        question: {
          ...questions[randomIndex],
          question: fixQuestionText(questions[randomIndex].question),
          correct_answer: fixQuestionText(
            questions[randomIndex].correct_answer
          ),
        },
      }));
    } catch (error: any) {
      setGameState((prev) => ({
        ...prev,
        error: error.message,
      }));
    }
  };

  const fixQuestionText = (questionText: string) =>
    questionText.replaceAll("&quot;", "'").replaceAll("&#039;", "'");

  const submitAnswer = (providedAnswer: string) => {
    const isCorrect =
      providedAnswer === gameState.question?.correct_answer ||
      providedAnswer === gameState.question?.correct_answer.toLowerCase();
    setGameState((prev) => ({
      ...prev,
      isCorrect,
      providedAnswer,
    }));
  };

  const createMultipleChoice = () => {
    setGameState((prev) => ({
      ...prev,
      multipleChoice: true,
    }));
  };

  useEffect(() => {
    if (!gameState.spinAmount) return;
    fetchQuestion();
  }, [gameState.spinAmount]);

  const setStep = (step: number) => {
    setGameState((prev) => ({
      ...prev,
      step,
    }));
  };

  const value: GameContextInterface = {
    gameState,
    startGame,
    resetGame,
    playAgain,
    selectCategory,
    onSpinStart,
    onSpinComplete,
    setStep,
    submitAnswer,
    createMultipleChoice,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
