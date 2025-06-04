import { baseUrl } from "@/utils/baseUrl";

interface PRODUCT {
  getAllProducts: string;
  getAllCategory: string;
  getCategoryById: (id: string) => string;
  getProductById: (id: number) => string;
  getProductBySLug: string;
  createProduct: string;
  paginationProduct: (pageNo: number, limit: number) => string;
}

export const PRODUCTS: PRODUCT = {
  getAllProducts: baseUrl,
  getAllCategory: `${baseUrl}/category`,
  getProductById: (id: number) => {
    return `${baseUrl}${id}`;
  },
  getCategoryById: (type: string) => {
    return `${baseUrl}/category?type=${type}`;
  },
  getProductBySLug: "",
  createProduct: "",
  paginationProduct: (pageNo: number, limit: number) => {
    return `${baseUrl}/api/v1/products/?offset=${pageNo}&limit=${limit}`;
  },
};
