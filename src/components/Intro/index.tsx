import React, { useState } from "react";

import styles from "./GameIntro.module.scss";

type GameIntroProps = {
  setStep: (value: number) => void;
};

const GameIntro: React.FC<GameIntroProps> = ({ setStep }) => {
  const [playerName, setPlayerName] = useState("");

  const onSubmit = () => {};

  return (
    <div className="component_wrapper">
      <div className={styles.root}>
        <span className="primary_text xl_text">Hello :)</span>
        <span className="primary_text lg_text">🤑 Want Some Money? 🤑</span>
        <form onSubmit={onSubmit} className={styles.input_container}>
          <span className="secondary_text mdlg_text">
            What's your name? (optional)
          </span>
          <input
            placeholder="enter name"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
          />
          <button type="submit" className="btn_primary">
            Play
          </button>
        </form>
      </div>
    </div>
  );
};
export default GameIntro;
