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
import Amount from "./Amount";

type WheelSpinProps = {};

const WheelSpin: React.FC<WheelSpinProps> = () => {
  console.log("COMPONENT RENDERING");

  const { gameState, onSpinStart, onSpinComplete, setStep } =
    useContext(GameContext);

  const wheelRef = useRef<any>(null);

  const handleSpin = useCallback(() => {
    const absoluteDegree = Math.floor(5000 + Math.random() * 5000);
    console.log("here is current thing", wheelRef, absoluteDegree);

    // Apply spin styles
    wheelRef.current.style.transition = "all 10s ease-out";
    wheelRef.current.style.transform = `rotate(${absoluteDegree}deg)`;
    wheelRef.current.style.webkitTransform = `rotate(${absoluteDegree}deg)`;

    // update game state
    onSpinStart(absoluteDegree);
  }, [onSpinStart]);

  useEffect(() => {
    wheelRef.current.addEventListener("transitionend", () => {
      const relativeDegree = gameState.wheelState.absoluteDegree % 360;
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(${relativeDegree}deg)`;
      wheelRef.current.style.webkitTransform = `rotate(${relativeDegree}deg)`;
      console.log("HERE IS REF", wheelRef.current.style);

      // update game state
      onSpinComplete(relativeDegree);
    });
  }, [gameState.wheelState.absoluteDegree]);

  return (
    <div className="component_wrapper">
      <div className={styles.root}>
        <span className="primary_text xl_text">Spin the Wheel!</span>
        <span className="secondary_text lg_text">
          Category: {gameState.category.displayText}
        </span>
        <span className="accent_text pointer" onClick={() => setStep(1)}>
          Back
        </span>
        <div className={styles.wheel_container}>
          <img src="/pointer.svg" className={styles.wheel_pointer} />
          <img src="/wheel.png" ref={wheelRef} className={styles.wheel_body} />
        </div>
        {!gameState.spinAmount ? (
          <button
            className={classNames({
              btn_primary: true,
              disabled: gameState.wheelState.isSpinning,
            })}
            onClick={handleSpin}
            disabled={gameState?.wheelState?.isSpinning}
          >
            {gameState.wheelState.isSpinning ? "Spinning!" : "Spin"}
          </button>
        ) : (
          <button className="btn_primary" onClick={() => setStep(3)}>
            Go to Question
          </button>
        )}
        {!!gameState.spinAmount && !gameState.wheelState.isSpinning && (
          <Amount spinAmount={gameState.spinAmount} textSpin />
        )}
      </div>
    </div>
  );
};
export default WheelSpin;
