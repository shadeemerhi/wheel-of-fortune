import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameProvider";

import Amount from "../WheelSpin/Amount";
import MultipleChoice from "./MultipleChoice";

import styles from "./Question.module.scss";

type QuestionProps = {};

const Question: React.FC<QuestionProps> = () => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const { gameState, submitAnswer, playAgain, convertToMultipleChoice } =
    useContext(GameContext);

  const onSubmit = () => {
    if (error) setError(false);

    if (!answer) {
      setError(true);
    }
    submitAnswer(answer);
  };

  return (
    <div className="component_wrapper">
      <div className={styles.root}>
        <Amount />
        <span className="secondary_text md_text">
          Category: {gameState.category.displayText}
        </span>
        <div className={styles.question_container}>
          <span className="xl_text">{gameState.question?.question}</span>
          {!gameState.providedAnswer && !gameState.multipleChoice && (
            <span className="secondary_text">
              If it's a number, please type as a word (e.g. 1 as 'one')
            </span>
          )}

          {gameState.providedAnswer ? (
            <>
              <div className={`${styles.result_container} lg_text`}>
                {gameState.isCorrect ? (
                  <>
                    <span className="success_text">Correct!</span>
                    <span>
                      💰 You won{" "}
                      <span className="success_text">
                        ${gameState.spinAmount}! 💰
                      </span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="error_text">Incorrect 😔</span>
                  </>
                )}
                <span className="md_text secondary_text">
                  Correct answer: {gameState.question?.correct_answer}
                </span>
                <span>Thank you for playing!</span>
                <br />
                <span className="lg_text pointer" onClick={playAgain}>
                  Play again
                </span>
                <br />
                {gameState.successfullySaved && (
                  <span className="accent_text sm_text">
                    Successfully saved
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              {gameState.multipleChoice ? (
                <MultipleChoice
                  choices={gameState.multipleChoice}
                  answer={answer}
                  setAnswer={setAnswer}
                />
              ) : (
                <>
                  <input
                    placeholder="Type answer"
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                  />
                  {error && (
                    <span className="error_text">Invalid submission</span>
                  )}
                </>
              )}
              <button className="btn_primary" onClick={() => onSubmit()}>
                Submit
              </button>
              {!gameState.multipleChoice && (
                <>
                  <span className="secondary_text pointer">Don't know?</span>
                  <span
                    className="underline_text"
                    onClick={convertToMultipleChoice}
                  >
                    Try multiple choice for 25% of the prize
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Question;
