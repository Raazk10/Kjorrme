import { sanity } from "../sanity.js";
const imageContainer = document.querySelector(".car-details-container");

export default async function fetchCarDetail() {
  console.log("fetchCarDetail called");
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const query = `*[_type=='product' && _id == $id]{
    _id,
    "image": image[].asset->url,
    name,
    kmstand,
    gearbox,
    fuel,
    enginePower,
    wheeldrive,
    price,
    description
  }`;

  const products = await sanity.fetch(query, { id });
  for (const product of products) {
    const productCard = displayCarDetail(product);
    imageContainer.appendChild(productCard);
  }
}

function displayCarDetail(product) {
  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("carDescription");

  const imageCard = document.createElement("div");
  imageCard.classList.add("carImage");
  for (const imageUrl of product.image) {
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageCard.appendChild(imageElement);
  }

  const description = document.createElement("p");
  description.classList.add("car-text");
  description.textContent = product.description;
  descriptionContainer.append(imageCard, description);

  return descriptionContainer;
}
