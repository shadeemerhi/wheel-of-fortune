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
import Modal from "../../components/Modal";

type WheelSpinProps = {};

const WheelSpin: React.FC<WheelSpinProps> = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setStep(3);
    setOpen(false);
  };
  const { gameState, onSpinStart, onSpinComplete, setStep } =
    useContext(GameContext);

  const wheelRef = useRef<any>(null);

  const handleSpin = useCallback(() => {
    const absoluteDegree = Math.floor(5000 + Math.random() * 5000);

    // Apply spin styles
    wheelRef.current.style.transition = "all 4s ease-out";
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

      // update game state
      onSpinComplete(relativeDegree);
      setTimeout(() => {
        handleOpen();
      }, 500);
    });
  }, [gameState.wheelState.absoluteDegree]);

  useEffect(() => {
    if (!gameState.wheelState.relativeDegree) return;
    /**
     * open modal when the relative degree state updates;
     * this means the wheel speen is complete and the value
     * has been determined
     */
    // handleOpen();
  }, [gameState.wheelState.relativeDegree]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="component_wrapper">
      <div className={styles.root}>
        <span className="primary_text xl_text">Spin the Wheel!</span>
        <span className="secondary_text md_text">
          Category: {gameState.category.displayText}
        </span>
        <span className="accent_text pointer" onClick={() => setStep(1)}>
          Back
        </span>
        <div className={styles.wheel_container}>
          <img src="/pointer.svg" className={styles.wheel_pointer} />
          <img src="/wheel.svg" ref={wheelRef} className={styles.wheel_body} />
        </div>
        {!gameState.spinAmount && (
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
        )}
      </div>
      <Modal open={open} handleClose={handleClose} />
    </div>
  );
};
export default WheelSpin;
