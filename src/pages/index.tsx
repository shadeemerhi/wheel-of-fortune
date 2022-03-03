import { useState, useContext } from "react";
import type { NextPage } from "next";

import Layout from "../components/Layout";
import GameIntro from "../components/Intro";
import Categories from "../components/Categories";
import WheelSpin from "../components/WheelSpin";
import Question from "../components/Question";
import Error from "../components/Error";

import { GameContext } from "../context/GameProvider";

const Home: NextPage = () => {
  const {
    gameState: { step, error },
  } = useContext(GameContext);

  return (
    <Layout>
      {error && <Error error={error} />}
      {step === 0 && <GameIntro />}
      {step === 1 && <Categories />}
      {step === 2 && <WheelSpin />}
      {step === 3 && <Question />}
    </Layout>
  );
};

export default Home;
