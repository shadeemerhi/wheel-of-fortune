import { useState, useContext } from "react";
import type { NextPage } from "next";

import Layout from "../components/Layout";
import GameIntro from "../components/Intro";
import Categories from "../components/Categories";
import WheelSpin from "../components/WheelSpin";

import { GameContext } from "../context/GameProvider";

const Home: NextPage = () => {
  const { gameState } = useContext(GameContext);

  return (
    <Layout>
      {gameState.step === 0 && <GameIntro />}
      {gameState.step === 1 && <Categories />}
      {gameState.step === 2 && <WheelSpin />}
    </Layout>
  );
};

export default Home;
