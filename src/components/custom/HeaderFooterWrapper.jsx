"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function HeaderFooterWrapper({
  children,
  headerData,
  footerData,
}) {
  const pathname = usePathname();
  // Only remove header/footer on exactly '/checkout'
  const showLayout = pathname !== "/checkout";

  return (
    <>
      {showLayout && <Header data={headerData} />}
      {children}
      {showLayout && <Footer data={footerData} />}
    </>
  );
}
