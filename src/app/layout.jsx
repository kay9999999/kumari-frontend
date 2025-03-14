import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { getGlobalPageData } from "@/data/loader";
import Footer from "@/components/Footer/Footer";
import StoreProvider from "@/redux/storeProvider";
import HeaderFooterWrapper from "@/components/custom/HeaderFooterWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shop with Kumari | Online",
  description: "Discover exquisite jewellery collections",
};

export default async function RootLayout({ children }) {
  const globalData = await getGlobalPageData();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <HeaderFooterWrapper
            headerData={globalData?.data?.header}
            footerData={globalData?.data?.footer}
          >
            <main>{children}</main>
          </HeaderFooterWrapper>{" "}
          <div id="static-add-to-cart-container" />
        </StoreProvider>
      </body>
    </html>
  );
}
