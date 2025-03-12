import React from "react";
import Image from "next/image";

const aboutUS = () => {

    
  return (
    <div className="mx-auto items-center justify-center mt-32">
    
      <div className="text-[#4D4D4D] container mx-auto my-8">
        <h1 className="text-4xl font-bold text-center mb-8 ">
          We Are Kumari
        </h1>
        <p className="text-center mx-auto max-w-2xl mb-7 text-base">
          We believe jewellery is meant to be flaunted, not locked up. We
          believe it should accentuate and elevate our every day. And we believe
          that it’s absolutely all right to go a bit extra when we want because
          life is meant to be squeezed the hell out of. And who would say no to
          extra joy, extra laughs and extra wonders that make our every day that
          much shinier? Think of us as a big-fat YES to showing up to the world
          in full glory- resplendent in jewels, bursting with colours and an
          up-for-anything attitude
        </p>

        <div className="flex flex-wrap justify-center items-center">
          {[
            "about01.jpg",
            "about02.jpg",
            "about03.jpg",
            "about04.jpg",
            "about05.jpg",
            "about06.jpg",
          ].map((src, index) => (
            <div key={index} className="">
              <Image
                className=""
                src={`/images/${src}`}
                width={200}
                height={246}
                alt="about"
              />
            </div>
          ))}
        </div>
      </div>

      {/*  Wearable Wonders */}
      <div className="mx-auto justify-items-center m-24">
        <Image
          className="max-w-56 flex"
          src="/images/wearable-wonders.jpg"
          width={848}
          height={320}
          alt=""
        />
        <div>
          <p className="text-center mx-auto max-w-2xl my-7 px-4">
            We create Wearable Wonders, AKA jewels that speak to the Kumari in
            all of us- the one who never holds back from expressing herself.
            This is luxury redefined in fine, wearable and precious jewellery
            that lets you wear your heart on your sleeve every day.
          </p>
        </div>
      </div>

      {/* Commitment */}
      <div className="m-5">
        <h1 className="text-3xl font-bold text-center mb-1">
          COMMITTED TO YOU
        </h1>
        <p className="text-center text-sm">
          Womanhood is not all rosé and diamonds, but there should be some
          things we can be sure of.
        </p>
      </div>

      {/* Values */}
      <div className="flex flex-wrap">
        {[
          {
            title: "PURE",
            src: "pure.jpg",
            text: "We are always on the lookout to create something that sparks joy every time you lay eyes on it. This includes using 14k to 24k gold to create every piece that allows for customisation. Each piece comes with authenticity certification and warranty so that you always stay gold.",
          },
          {
            title: "ETHICAL",
            src: "ethical.jpg",
            text: "We are in love with our planet like you. That is why we source and create with minimum damage to our surroundings. By using recyclable and reusable materials, we want to continue to create beautiful jewellery for a long, long time.",
          },
          {
            title: "DEVOTED",
            src: "devoted.jpg",
            text: "You’re at the heart of everything we do. And we are committed to making you feel wonderful every time you shop with us. So expect to see lifetime buyback, free resizing, and no-questions-asked exchange as the norm here.",
          },
        ].map((item, index) => (
          <div key={index} className="p-4 md:w-1/3">
            <div className="h-full overflow-hidden">
              <Image
                className="max-lg:h-48 w-full object-cover object-center"
                src={`/images/${item.src}`}
                width={720}
                height={400}
                alt=""
              />
              <div className="p-6">
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  {item.title}
                </h1>
                <p className="leading-relaxed mb-3">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*  Our Roots */}
      <div className="container mx-auto flex flex-row flex-wrap my-20">
        <div className="w-1/2 max-lg:w-full">
          <Image src="/images/our-roots.jpg" width={740} height={955} alt="" />
        </div>
       <div className="flex-col w-1/2 mt-64 px-12 justify-center max-xl:my-0 max-lg:w-full max-lg:my-9 max-md:text-center">
            <span className="text-2xl">Our</span>
            <br />
            <h1 className="text-5xl">ROOTS</h1>
            <p className="leading-relaxed my-8">
              We are in sync with the time because we have been doing this for a
              long time. While Kumari is new, its mission to craft authentic
              stories into jewellery has been part of our heritage at DP Jewel
              Line. For over eight decades, we have created a blend of
              timelessness and modernity through superior craftsmanship and
              innovation. <br />
              Started in 1940 by Late Shri Dhulchand Ji Kataria, DP Jewel Line has
              been part of the Indian jewellery story from the start. The solid
              foundation of purity and trust laid by him has continued to soar
              higher under the subsequent generations
            </p>
            <div className="flex md:mt-4 mt-6 max-lg:justify-center">
              <button className="text-white text-center text-base bg-black border-0 py-5 px-10 min-w-60 focus:outline-none">
                KNOW MORE
              </button>
            </div>
          </div>
      </div>

      
      <div className="container heading-section mx-auto max-lg:text-center">
        <h2 className="text-4xl">A COLLECTIVE VISION</h2>
      </div>

      {/* Team Members */}
      {[
        {
          name: "VIKAS KATARIA",
          title: "FOUNDER & OWNER",
          src: "vikas-kataria.jpg",
          text: "Vikas Kataria, founder and owner of Kumari Fine Jewellery, brings a visionary approach that redefines the language of jewellery and luxury with a contemporary Indian edge. Hailing from a lineage of successful jewellers, Vikas brings with him not just a heritage of craftsmanship but an innate understanding of the art of making and selling jewellery. With decades of experience in the industry, he effortlessly weaves together tradition and modernity, crafting a fitting tribute to femininity that resonates with the boldness and boundless spirit of the Indian woman. As the torchbearer of his family's legacy and possessing the acumen of a true founder, Vikas propels Kumari forward with a forward-thinking vision that speaks volumes beyond the materials it's made of.",
          reverse: false,
        },
        {
          name: "SUPRIYA KATARIA",
          title: "Co-Founder",
          src: "supriya-kataria.jpg",
          text: "Supriya stands as the dynamic force alongside Vikas, instrumental in breathing life into this visionary endeavour. Representing the voice of the contemporary Indian woman, she brings a keen understanding of current trends and the desires of the modern woman. With a finger on the pulse of the times, Supriya propels the brand forward, ensuring its unwavering relevance and resonance with today's women. Her perspective shapes Kumari's offerings, infusing them with an energy that aligns perfectly with the aspirations of the women they are designed for.",
          reverse: true,
        },
        {
          name: "YASH KATARIA",
          title: "Co-Founder",
          src: "yash_kataria.jpg",
          text: "Yash Kataria embodies the spirit of innovation and global sensibility that Kumari prides itself on. He brings a vision to make Kumari a globally benchmarked brand, celebrated not only for its exquisite designs but also for its role in shaping the future of jewellery. With an intuitive grasp of the ever-evolving fashion landscape, Yash's contributions to Kumari are marked by his ability to anticipate and influence trends, ensuring the brand remains at the cutting edge of the jewellery industry. His global understanding extends beyond design, incorporating a deep appreciation for craftsmanship, sustainability, and the narrative power of jewellery.",
          reverse: false,
        },
        {
          name: "AMIT BANDI",
          title: "CEO",
          src: "amit_bandi.jpg",
          text: "Amit Bandi, CEO of Kumari Fine Jewellery, is the visionary architect behind the brand. With two decades steeped in the world of jewellery, he carries the knowledge and insight necessary to forge a brand like Kumari from the ground up. A driving force in strategy and execution, Amit crafts the blueprint for success. From selecting the right collaborators to steering business development and strategy, his expertise lays the foundation for Kumari's remarkable journey. His strategic acumen and business prowess infuse the brand with a distinctive identity, ensuring that every facet of Kumari resonates with the essence of modern luxury and innovation.",
          reverse: true,
        },
      ].map((member, index) => (
        <div
          key={index}
          className="container mx-auto flex flex-row flex-wrap my-6"
        >
          <div
            className={`w-1/2 max-lg:w-full flex justify-center ${
              member.reverse ? "order-1" : ""
            }`}
          >
            <Image
              src={`/images/${member.src}`}
              width={666}
              height={724}
              alt=""
              className="md:max-w-[666px] mx-auto"
            />
          </div>
          <div
            className={`flex-col w-1/2 mt-64 px-12 justify-center max-xl:my-0 max-lg:w-full max-lg:my-9 ${
              member.reverse ? "max-lg:order-2" : ""
            }`}
          >
            <h1 className="text-5xl italic">{member.name}</h1>
            <span className="text-sm">{member.title}</span>
            <p className="text-base my-8">{member.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default aboutUS;
