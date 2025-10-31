import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Navbar />
      <main style={{ padding: "1rem", minHeight: "80vh" }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </CartProvider>
  );
}
