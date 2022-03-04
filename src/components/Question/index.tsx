import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameProvider";
import Amount from "../WheelSpin/Amount";

import styles from "./Question.module.scss";

type QuestionProps = {};

const Question: React.FC<QuestionProps> = () => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const { gameState, submitAnswer, playAgain } = useContext(GameContext);

  const onSubmit = (unknown?: boolean) => {
    if (error) setError(false);

    if (!answer && unknown === undefined) {
      setError(true);
    }
    submitAnswer(answer, unknown);
  };
  return (
    <div className="component_wrapper">
      <div className={styles.root}>
        <span className="primary_text xl_text">Answer to Win</span>
        <span className="secondary_text md_text">
          Category: {gameState.category.displayText}
        </span>
        <Amount spinAmount={gameState.spinAmount} />
        <div className={styles.question_container}>
          <span className="xl_text">{gameState.question?.question}</span>
          <span className="secondary_text">
            If it's a number, please type as a word (e.g. 1 as 'one')
          </span>

          {gameState.providedAnswer || gameState.unknown ? (
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
              </div>
            </>
          ) : (
            <>
              <input
                placeholder="Type answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
              />
              {error && <span className="error_text">Invalid submission</span>}
              <button className="btn_primary" onClick={() => onSubmit()}>
                Submit
              </button>
              <span
                className="secondary_text pointer"
                onClick={() => onSubmit(true)}
              >
                I don't know 😕
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Question;
