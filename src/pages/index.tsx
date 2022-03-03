import { useState, useContext } from "react";
import type { NextPage } from "next";

import Layout from "../components/Layout";
import Categories from "../components/Categories";

import { GameContext } from "../context/GameProvider";

const Home: NextPage = () => {
  const [step, setStep] = useState(0);

  const { gameState } = useContext(GameContext);
  console.log("HERE IS GAME STATE", gameState);

  return (
    <Layout>
      <Categories />
    </Layout>
  );
};

export default Home;
