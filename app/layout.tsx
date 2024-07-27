import { PropsWithChildren } from "react";
import { titres, textes, specs } from "./font";
import "./styles.css";
import "./globals.css";
import Header from "./components/header/page";
import Footer from "./components/footer/page";


export const metadata = {
  title: 'Les archers sans Limites',
  description: "Site du club de tir à l'arc de Heillecourt en Meurthe et Moselle Dans le 54",
  
}


export default function RootLayout({ children }: PropsWithChildren) {
  return (
  <>
    <html lang="fr">
      <body className={`${textes.className} ${titres.className} ${specs.className}`}>
      <Header/>
     <main> {children}</main>
      <Footer/>
      </body>
    </html>
    </>
  );
}