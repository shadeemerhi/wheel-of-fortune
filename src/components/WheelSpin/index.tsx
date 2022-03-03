import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { GameContext } from "../../context/GameProvider";

import styles from "./WheelSpin.module.scss";
import classNames from "classnames";

type WheelSpinProps = {};

const WheelSpin: React.FC<WheelSpinProps> = () => {
  console.log("COMPONENT RENDERING");

  const { gameState, onSpinStart, onSpinComplete } = useContext(GameContext);

  const wheelRef = useRef<any>(null);

  const handleSpin = useCallback(() => {
    const absoluteDegree = Math.floor(5000 + Math.random() * 5000);
    console.log("here is current thing", wheelRef, absoluteDegree);

    // Apply spin styles
    wheelRef.current.style.transition = "all 10s ease-out";
    wheelRef.current.style.transform = `rotate(${absoluteDegree}deg)`;

    // update game state
    onSpinStart(absoluteDegree);
  }, [onSpinStart]);

  useEffect(() => {
    wheelRef.current.addEventListener("transitionend", () => {
      const relativeDegree = gameState.wheelState.absoluteDegree % 360;
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(${relativeDegree}deg)`;

      // update game state
      onSpinComplete(relativeDegree);
    });
  }, [gameState.wheelState.absoluteDegree]);

  return (
    <div className="component_wrapper">
      <div className={styles.root}>
        <span className="primary_text xl_text">Spin the Wheel!</span>
        <span className="secondary_text">
          Category: {gameState.category.displayText}
        </span>
        <span className="accent_text pointer">Back</span>
        <div className={styles.wheel_container}>
          <img src="/pointer.svg" className={styles.wheel_pointer} />
          <img src="/wheel.svg" ref={wheelRef} className={styles.wheel_body} />
        </div>
        <button
          className="btn_primary"
          onClick={handleSpin}
          disabled={gameState?.wheelState?.isSpinning}
        >
          Spin!
        </button>
        {!!gameState.spinAmount && (
          <div className={styles.amount_container}>
            <span className="lg_text">Potential Winnings:</span>
            <span className="lg_text success_text">
              ${gameState.spinAmount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default WheelSpin;
