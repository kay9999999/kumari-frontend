import Hero from "@/components/custom/Homepage/Hero";
import "./globals.css";
import Usp from "@/components/custom/Homepage/Usp-block";
import { getHomePageData } from "@/data/loader";
import Categories from "@/components/custom/Homepage/Categories";
import Hero_mid from "@/components/custom/Homepage/Hero_mid";
import Store from "@/components/custom/Homepage/Store";
import Slider from "@/components/custom/Homepage/Slider";
import Policy from "@/components/custom/Homepage/Policy";
import Story from "@/components/custom/Homepage/Story";
import Guide from "@/components/custom/Homepage/Guide";
import Home_Product from "@/components/custom/Homepage/Home_Product";

export default async function Home() {
  const response = await getHomePageData();
  return (
    <div>
      <Hero response={response} />
      <Usp response={response} />
      <Categories response={response} />
      <Hero_mid response={response} />
      <Store response={response} />
      <Slider response={response} />
      <Policy response={response} />
      <Home_Product response={response} />
      <Story response={response} />
      <Guide response={response} />
    </div>
  );
}
