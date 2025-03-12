import React from "react";
import Link from "next/link";
import Image from "next/image"; 

 
const COLLECTION_CARDS = [
    {
      id: 1,
      title: "Heart to Get",
      image: "/images/our-collections/oc-heart-to-get.jpg",
      link: "/collections/heart-to-get",
    },
    {
      id: 2,
      title: "Flower Child",
      image: "/images/our-collections/oc-flower-child.jpg",
      link: "/collections/flower-child",
    },
    {
      id: 3,
      title: "Dream Weaver",
      image: "/images/our-collections/oc-dreamweaver.jpg",
      link: "/collections/dream-weaver",
    },
    {
      id: 4,
      title: "The Name's Bond",
      image: "/images/our-collections/oc-names-bond.jpg",
      link: "/collections/the-name-s-bond",
    },
    {
      id: 5,
      title: "Royal Rebel",
      image: "/images/our-collections/oc-royal-rebel.jpg",
      link: "/collections/royal-rebel",
    },
    {
      id: 6,
      title: "Starry Eyed",
      image: "/images/our-collections/oc-starry-eyed.jpg",
      link: "/collections/starry-eyed",
    },
    {
      id: 7,
      title: "Mermaid Magic",
      image: "/images/our-collections/oc-mermaid-magic.jpg",
      link: "/collections/mermaid-magic",
    },
    {
      id: 8,
      title: "Art Of Tart",
      image: "/images/our-collections/oc-art-of-tart.jpg",
      link: "/collections/art-of-tart",
    },
    {
      id: 9,
      title: "Hues That Girl",
      image: "/images/our-collections/oc-hues-that-girl.jpg",
      link: "/collections/hues-that-girl",
    },
    {
      id: 10,
      title: "Miss Twist",
      image: "/images/our-collections/oc-miss-twist.jpg",
      link: "/collections/miss-twist",
    },
    {
      id: 11,
      title: "Pinky Promise",
      image: "/images/our-collections/oc-pinky-promise.jpg",
      link: "/collections/pinky-promise",
    },
    {
      id: 12,
      title: "Light Keeper",
      image: "/images/our-collections/oc-light-keeper.jpg",
      link: "/collections/light-keeper",
    },
  ];


const Collection = () => {

    return (
      <section className="container mx-auto px-4 py-8 text-[#4D4D4D]">

   
        <header className="text-center mb-20 mt-32 ">
          <h1 className="text-4xl font-bold mb-5">
            Our COLLECTIONS
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed">
          Whether you're feeling sassy, fierce, or even just that extra bit of fabulous, we've got a collection that'll vibe right along with you. So stack 'em up, layer 'em on, and let your jewellery do the talking while you go extra every day. Because let's face it, your moods are a masterpiece, and your jewellery game should be too!
          </p>
          
        </header>
  
        {/* Collections Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {COLLECTION_CARDS.map((card, index) => (
            <article
              key={card.id}
              className={`relative group mb-20 ${
                index % 2 === 1 ? "md:translate-y-[17rem]" : ""
              }`}
            >
              <h2 className="text-3xl uppercase mb-5 font-semibold text-left max-md:text-center">
                {card.title}
              </h2>
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2} 
                />
                <div className="absolute inset-0 flex items-end justify-center pb-10">
                  <Link href={card.link} className="relative z-10">
                    <button className="min-w-56 px-10 py-4 bg-transparent text-white border-2 border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out uppercase">
                      Discover
                    </button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  };
  
  export default Collection;
