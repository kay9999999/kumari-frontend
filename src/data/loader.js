import qs from "qs";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

// data fetching function
export async function fetchData(url, authToken) {
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch data");
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

// Fetch data from Strapi
export async function getHomePageData() {
  const url = new URL("/api/home-page", baseUrl);
  url.search = qs.stringify({
    populate: {
      hero: { fields: ["url"] },
      Usp: {
        populate: {
          usp_1: true,
          usp_2: true,
          usp_3: true,
          usp_4: true,
        },
      },
      categories: {
        populate: {
          rings: true,
          earrings: true,
          pendants: true,
          necklaces: true,
          bracelets: true,
          charms: true,
        },
      },
      categories_hover: {
        populate: {
          rings: true,
          earrings: true,
          pendants: true,
          necklaces: true,
          bracelets: true,
          charms: true,
        },
      },
      hero_2: { fields: ["url"] },
      bg_mid: { fields: ["url"] },
      carousel: {
        populate: {
          img_1: { fields: ["url"] },
          img_2: { fields: ["url"] },
          img_3: { fields: ["url"] },
        },
      },
      store: { fields: ["url"] },

      slides: {
        populate: {
          image: { fields: ["url"] },
        },
      },
      policy: {
        populate: {
          shipping: true,
          return: true,
          insurance: true,
          buyback: true,
        },
      },
      home_product: {
        populate: {
          image: { fields: ["url"] },
        },
      },
      story: { fields: ["url"] },
      guide: {
        populate: {
          image: { fields: ["url"] },
        },
      },
    },
  });

  return await fetchData(url.href);
}

export async function getGlobalPageData() {
  const url = new URL("/api/global", baseUrl);
  url.search = qs.stringify({
    populate: [
      "header.logo",
      "header.rings",
      "header.earrings",
      "header.pendants",
      "header.bangles",
      "header.shopall",
      "header.gifts",
      "header.collection",
      "footer.amex",
      "footer.visa",
      "footer.paypal",
    ],
  });

  return await fetchData(url.href);
}
