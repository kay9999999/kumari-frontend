import axios from "axios";

export const makeRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL, // Ensure this is set correctly
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
});
