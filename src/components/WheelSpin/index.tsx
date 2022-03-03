import React, { useContext, useEffect, useRef, useState } from "react";

import { GameContext } from "../../context/GameProvider";

import styles from "./WheelSpin.module.scss";
import classNames from "classnames";

type WheelSpinProps = {};

const WheelSpin: React.FC<WheelSpinProps> = () => {
  const [wheelState, setWheelState] = useState({
    isSpinning: false,
    absoluteDegree: 0,
    relativeDegree: 0,
  });
  const { gameState, onSpinComplete } = useContext(GameContext);

  const wheelRef = useRef<any>(null);

  const onSpin = () => {
    const absoluteDegree = Math.floor(5000 + Math.random() * 5000);
    console.log("here is current thing", wheelRef, absoluteDegree);
    wheelRef.current.style.transition = "all 10s ease-out";
    wheelRef.current.style.transform = `rotate(${absoluteDegree}deg)`;
    setWheelState((prev) => ({
      ...prev,
      isSpinning: true,
      absoluteDegree,
    }));
  };

  useEffect(() => {
    wheelRef.current.addEventListener("transitionend", () => {
      console.log("here is transition end LOL");
      const relativeDegree = wheelState.absoluteDegree % 360;
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(${relativeDegree}deg)`;

      setWheelState((prev) => ({
        ...prev,
        isSpinning: false,
        relativeDegree,
      }));
      onSpinComplete(relativeDegree);
    });
  }, [wheelState.absoluteDegree]);

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
          onClick={onSpin}
          disabled={wheelState.isSpinning}
        >
          Spin!
        </button>
      </div>
    </div>
  );
};
export default WheelSpin;
