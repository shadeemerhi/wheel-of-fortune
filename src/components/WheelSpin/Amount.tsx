import React from "react";

import styles from "./WheelSpin.module.scss";
import classNames from "classnames";

type AmountProps = {
  spinAmount: number;
  textSpin?: boolean;
};

const Amount: React.FC<AmountProps> = ({ spinAmount, textSpin }) => {
  return (
    <div className={styles.amount_container}>
      <span className="lg_text">🤑 Potential Winnings 🤑</span>
      <span
        className={classNames({
          [styles.amount_text]: true,
          [styles.text_spin]: textSpin,
        })}
      >
        ${spinAmount}
      </span>
    </div>
  );
};
export default Amount;
