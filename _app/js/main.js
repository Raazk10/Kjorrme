import fetchCarDetail from "./modules/fetchCarDetail.js";
import fetchProduct from "./modules/fetchProduct.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchProduct();
  fetchCarDetail();
});
