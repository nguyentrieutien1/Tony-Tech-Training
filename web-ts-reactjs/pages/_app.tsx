import type { AppProps } from "next/app";
import "../styles/main.css";
import "../styles/modal.css";
import "../styles/cart.css";
import "../styles/variables.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />;
    </>
  );
}
