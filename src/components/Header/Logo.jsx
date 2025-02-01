import Link from "next/link";
import { StrapiImage } from "../custom/Strapi-image";

const Logo = ({ logo }) => (
  <div className="h-8 lg:h-10 w-full lg:w-28 xl:h-12 xl:w-32 lg:ml-1 relative">
    <Link href="/">
      <StrapiImage src={logo?.url} alt="Logo" fill className="object-contain" />
    </Link>
  </div>
);

export default Logo;
