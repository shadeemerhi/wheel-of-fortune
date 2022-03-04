import React, { ReactNode, useEffect, useState } from "react";
import { json } from "stream/consumers";
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
  successfullySaved: false,
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
  convertToMultipleChoice: null,
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
      console.log("HERE ARE RESULTS", results);

      const questions = results.filter(
        (question) => question.type !== "boolean"
      );

      const randomIndex = Math.floor(Math.random() * questions.length);
      const isMultipleChoice =
        questions[randomIndex].question.includes("Which of");
      const question = questions[randomIndex];
      setGameState((prev) => ({
        ...prev,
        question: {
          ...question,
          question: fixQuestionText(question.question),
          correct_answer: fixQuestionText(
            questions[randomIndex].correct_answer
          ),
        },
        multipleChoice: isMultipleChoice
          ? (getMultipleChoiceAnswers(
              question.correct_answer,
              question.incorrect_answers
            ) as string[])
          : undefined,
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

  const submitAnswer = async (providedAnswer: string) => {
    const isCorrect =
      providedAnswer === gameState.question?.correct_answer ||
      providedAnswer === gameState.question?.correct_answer.toLowerCase();

    const updatedGameState = {
      ...gameState,
      isCorrect,
      providedAnswer,
    };
    setGameState((prev) => ({
      ...updatedGameState,
    }));

    // post result to API
    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGameState),
      });

      if (response.status !== 200) {
        throw new Error("Error saving entry");
      }
      setGameState((prev) => ({
        ...prev,
        successfullySaved: true,
      }));
    } catch (error: any) {
      setGameState((prev) => ({
        ...prev,
        error: error.message,
      }));
    }
  };

  const convertToMultipleChoice = () => {
    const questionAnswers = getMultipleChoiceAnswers(
      gameState.question?.correct_answer!,
      gameState.question?.incorrect_answers!
    );

    setGameState((prev) => ({
      ...prev,
      multipleChoice: questionAnswers as string[],
      spinAmount: Math.round(0.25 * gameState.spinAmount),
    }));
  };

  const getMultipleChoiceAnswers = (
    correctAnswer: string,
    incorrectAnswers: string[]
  ) => {
    const questionAnswers = [correctAnswer, ...incorrectAnswers];

    for (let i = questionAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = questionAnswers[i];
      questionAnswers[i] = questionAnswers[j];
      questionAnswers[j] = temp;
    }
    return questionAnswers;
  };

  useEffect(() => {
    if (!gameState.spinAmount || gameState.question) return;
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
    convertToMultipleChoice,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
