import { PropsWithChildren } from "react";

import "./globals.css";
import "./styles.css";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body>
      <Header/>
          {children}
          <Footer/>
      </body>
    </html>
  );
}