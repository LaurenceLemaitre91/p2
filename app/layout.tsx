import { PropsWithChildren } from "react";

import "./styles.css";
import "./globals.css";
import Header from "./components/header/page";
import Footer from "./components/footer/page";

import localFont from "next/font/local";

const titres = localFont({ src: "../public/font/titres.ttf" });
const textes = localFont({ src: "../public/font/textes.ttf" });
const specs = localFont({ src: "../public/font/specs.ttf" });

export const metadata = {
  title: "Les archers sans Limites",
  description:
    "Site du club de tir à l'arc de Heillecourt en Meurthe et Moselle Dans le 54",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="fr">
        <body
          className={`${textes.className} ${titres.className} ${specs.className}`}
        >
          <Header />
          <main> {children}</main>
          <Footer />
        </body>
      </html>
    </>
  );
}
