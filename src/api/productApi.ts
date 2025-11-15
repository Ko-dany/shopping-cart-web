import type { Product } from "../models/types";

// API base URL
const BASE_URL = "https://your-api-url.com";

export const fetchProducts = async (): Promise<Product[]> => {
  // TODO: Implement API call to fetch products
  return [];
};

export const getProductById = async (id: number): Promise<Product | null> => {
  // TODO
  return null;
};

export const addProduct = async (product: Product): Promise<boolean> => {
  // TODO
  return false;
};

export const updateProduct = async (
  id: number,
  product: Product
): Promise<boolean> => {
  // TODO
  return false;
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  // TODO
  return false;
};
