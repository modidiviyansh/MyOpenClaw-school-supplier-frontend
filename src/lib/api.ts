import axios from "axios";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Create an axios instance for Strapi
const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const getStrapiURL = (path = "") => {
  return `${STRAPI_URL}${path}`;
};

// Helper to extract image URL
export const getStrapiMedia = (url: string | null | undefined): string | undefined => {
  if (url == null) {
    return undefined;
  }

  // If the image URL is already absolute, return it
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
};

export const fetchAPI = async (path: string, urlParamsObject = {}, options = {}) => {
  try {
    // Merge default and user options
    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      ...options,
    };

    // Build request URL
    const queryString = new URLSearchParams(urlParamsObject).toString();
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(response.statusText);
      throw new Error(`An error occurred please try again`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`An error occurred please try again`);
  }
};

// Specific fetchers
export const getProducts = async () => {
  const products = await fetchAPI("/products", { populate: "*" });
  return products.data;
};

export const getProduct = async (id: string) => {
  const product = await fetchAPI(`/products/${id}`, { populate: "*" });
  return product.data;
};
