import React, { useContext } from "react";
import { GameContext } from "../../context/GameProvider";

import styles from "./WheelSpin.module.scss";
import classNames from "classnames";

type AmountProps = {
  textSpin?: boolean;
};

const Amount: React.FC<AmountProps> = ({ textSpin }) => {
  const {
    gameState: { spinAmount },
  } = useContext(GameContext);
  return (
    <div className={styles.amount_container}>
      <span className="mdlg_text">Potential Winnings 🤑</span>
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
