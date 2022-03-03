import "../styles/globals.scss";
import type { AppProps } from "next/app";
import GameProvider from "../context/GameProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}

export default MyApp;
