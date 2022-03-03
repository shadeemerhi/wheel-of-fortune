import { useState, useContext } from "react";
import type { NextPage } from "next";

import Layout from "../components/Layout";
import GameIntro from "../components/Intro";
import Categories from "../components/Categories";

import { GameContext } from "../context/GameProvider";

const Home: NextPage = () => {
  const [step, setStep] = useState(0);

  const { gameState } = useContext(GameContext);

  return (
    <Layout>
      {step === 0 && <GameIntro setStep={setStep} />}
      {step === 1 && <Categories />}
    </Layout>
  );
};

export default Home;
