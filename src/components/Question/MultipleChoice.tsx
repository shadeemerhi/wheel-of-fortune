import React from "react";

type MultipleChoiceProps = {
  setAnswer: (value: string) => void;
  choices: string[];
};

const MultipleChoice: React.FC<MultipleChoiceProps> = () => {
  return <div>Here is multiple choice</div>;
};
export default MultipleChoice;
