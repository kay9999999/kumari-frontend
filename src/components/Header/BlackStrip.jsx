import Link from "next/link";

const BlackStrip = () => (
  <div className="relative z-50 overflow-hidden">
    <div className="bg-black text-white text-[10px] xs:text-xs underline p-1.5">
      <div className="container mx-auto px-4 text-center">
        <Link
          href="/"
          className="block animate-textInOut will-change-transform"
        >
          Bold, modern, made to shine - Shop The Gold Collection{" "}
        </Link>
      </div>
    </div>
  </div>
);

export default BlackStrip;
