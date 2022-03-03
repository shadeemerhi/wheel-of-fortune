import React, { useContext, useEffect, useRef } from "react";

import { GameContext } from "../../context/GameProvider";

import styles from "./WheelSpin.module.scss";

type WheelSpinProps = {};

const WheelSpin: React.FC<WheelSpinProps> = () => {
  const { gameState } = useContext(GameContext);

  const wheelRef = useRef<any>(null);

  const onSpin = () => {
    const deg = Math.floor(5000 + Math.random() * 5000);
    console.log("here is current thing", wheelRef, deg);
    wheelRef.current.style.transition = "all 10s ease-out";
    wheelRef.current.style.transform = `rotate(${deg}deg)`;
  };

  useEffect(() => {
    wheelRef.current.addEventListener("transitionend", () => {
      console.log("here is transition end LOL");
    });
  }, []);

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
        <button className="btn_primary" onClick={onSpin}>
          Spin!
        </button>
      </div>
    </div>
  );
};
export default WheelSpin;
