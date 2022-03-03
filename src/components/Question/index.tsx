import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameProvider";
import Amount from "../WheelSpin/Amount";

import styles from "./Question.module.scss";

type QuestionProps = {};

const Question: React.FC<QuestionProps> = () => {
  const [answer, setAnswer] = useState("");
  const { gameState } = useContext(GameContext);
  return (
    <div className="component_wrapper">
      <div className={styles.root}>
        <span className="primary_text xl_text">Answer to Win</span>
        <span className="secondary_text lg_text">
          Category: {gameState.category.displayText}
        </span>
        <Amount spinAmount={gameState.spinAmount} />
        <div className={styles.question_container}>
          <span className="xl_text">{gameState.question?.question}</span>
          <input
            placeholder="Type answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />
          <div className={styles.button_container}>
            <button className="btn_primary">Submit</button>
            <span className="secondary_text">I don't know 😕</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Question;
