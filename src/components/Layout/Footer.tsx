import { useContext } from "react";
import { GameContext } from "../../context/GameProvider";

import styles from "../../styles/Layout.module.scss";

const Footer: React.FC = () => {
  const { gameState, resetGame } = useContext(GameContext);
  return (
    <div className={styles.footer}>
      {gameState.step !== 0 && (
        <span
          className={`${styles.reset_text} secondary_text pointer`}
          onClick={resetGame}
        >
          Reset Game
        </span>
      )}
      <span className="sm_text accent_text">Created by Shadee Merhi 2022</span>
    </div>
  );
};
export default Footer;
