import React from "react";

import styles from "./Question.module.scss";
import classNames from "classnames";

type ChoiceItemProps = {
  choice: string;
  setAnswer: (value: string) => void;
  selected: boolean;
};

const ChoiceItem: React.FC<ChoiceItemProps> = ({
  choice,
  setAnswer,
  selected,
}) => {
  return (
    <div
      className={classNames({
        [styles.question_item]: true,
        [styles._selected]: selected,
      })}
      onClick={() => setAnswer(choice)}
    >
      {choice}
    </div>
  );
};
export default ChoiceItem;
