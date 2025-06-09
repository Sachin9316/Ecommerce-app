export const ROUTES = {
  root: "/",
  auth: "/login/PhoneNumberLoginScreen",
  productDetail: (id: any) => {
    return `/product/${id}`;
  },
};
