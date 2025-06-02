import { baseUrl } from "@/utils/baseUrl";

interface PRODUCT {
  getAllProducts: string;
  getProductById: (id: number) => string;
  getProductBySLug: string;
  createProduct: string;
  paginationProduct: (pageNo: number, limit: number) => string;
}

export const PRODUCTS: PRODUCT = {
  getAllProducts: baseUrl,
  getProductById: (id: number) => {
    return `${baseUrl}${id}`;
  },
  getProductBySLug: "",
  createProduct: "",
  paginationProduct: (pageNo: number, limit: number) => {
    return `${baseUrl}/api/v1/products/?offset=${pageNo}&limit=${limit}`;
  },
};
