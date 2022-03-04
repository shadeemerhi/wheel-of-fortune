import React from "react";
import ChoiceItem from "./ChoiceItem";

type MultipleChoiceProps = {
  setAnswer: (value: string) => void;
  answer: string;
  choices: string[];
};

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  choices,
  answer,
  setAnswer,
}) => {
  return (
    <>
      {choices.map((choice, index) => (
        <ChoiceItem
          key={index}
          choice={choice}
          selected={choice === answer}
          setAnswer={setAnswer}
        />
      ))}
    </>
  );
};
export default MultipleChoice;
