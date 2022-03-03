import { useState } from "react";
import type { NextPage } from "next";

import Layout from "../components/Layout";
import Categories from "../components/Categories";

const Home: NextPage = () => {
  const [step, setStep] = useState(0);
  return (
    <Layout>
      <Categories />
    </Layout>
  );
};

export default Home;
