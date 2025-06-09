export const ROUTES = {
  root: "/",
  auth: "/login",
  productDetail: (id: any) => {
    return `/product/${id}`;
  },
};
