import { sanity } from "../sanity.js";

const productContainer = document.querySelector(".car-images");

export default async function fetchProduct() {
  const query = `*[_type=='product']{
		_id,
		"image":image[0].asset->url,
		name,
		kmstand,
		gearbox,
		fuel,
		enginePower,
		wheeldrive,
		price,
	  }`;

  const products = await sanity.fetch(query);
  for (const product of products) {
    const productCard = renderHtml(product);
    productContainer.appendChild(productCard);
  }
}

function renderHtml(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("car-card");

  const productDetails = document.createElement("div");
  productDetails.classList.add("car-card__details");

  const imageElement = document.createElement("img");
  imageElement.classList.add("car-card__image");
  imageElement.src = product.image;

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("car-card__title");
  cardTitle.textContent = product.name;
  productDetails.appendChild(cardTitle);

  const cardDrivenElement = document.createElement("p");
  cardDrivenElement.classList.add("car-card__km");
  cardDrivenElement.textContent = `${product.kmstand} km`;
  productDetails.appendChild(cardDrivenElement);

  // Create icons and add them to productDetails
  const iconsContainer = createIcons(product);
  productDetails.appendChild(iconsContainer);

  //price
  const carPrice = document.createElement("div");
  carPrice.classList.add("car-card__price");

  const carPriceTitle = document.createElement("h3");
  carPriceTitle.classList.add("car-card__price-title");
  carPriceTitle.textContent = "Pris";

  const price = document.createElement("p");
  price.classList.add("car-card__price-value");
  price.textContent = `${product.price} kr`;
  carPrice.append(carPriceTitle, price);
  productDetails.appendChild(carPrice);

  const buttonElement = document.createElement("button");

  buttonElement.classList.add("car-card__button");
  buttonElement.textContent = "Vis mer";
  buttonElement.addEventListener("click", () => {
    window.location.href = `/_app/car-detail/index.html?id=${product._id}`;
  });
  productDetails.appendChild(buttonElement);

  productCard.append(imageElement, productDetails);

  return productCard;
}

function createIcons(product) {
  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("car-card__icons");

  const gearboxIcon = createIcon(
    "car-card__icon--gearbox",
    "./assets/images/gearbox-icon.png",
    "Gearbox",
    product.gearbox
  );
  const fuelIcon = createIcon(
    "car-card__icon--fuel",
    "./assets/images/fuel-icon.png",
    "Fuel",
    product.fuel
  );
  const enginePowerIcon = createIcon(
    "car-card__icon--engine-power",
    "./assets/images/engine-icon.png",
    "Engine Power",
    `${product.enginePower} HP`
  );
  const wheelDriveIcon = createIcon(
    "car-card__icon--wheel-drive",
    "./assets/images/wheeldrive-icon.png",
    "Wheel Drive",
    product.wheeldrive
  );

  iconsContainer.append(gearboxIcon, fuelIcon, enginePowerIcon, wheelDriveIcon);
  return iconsContainer;
}

function createIcon(modifierClass, imgSrc, imgAlt, textContent) {
  const iconElement = document.createElement("div");
  iconElement.classList.add("car-card__icon", modifierClass);

  const iconImg = document.createElement("img");
  iconImg.src = imgSrc;
  iconImg.alt = imgAlt;

  const iconText = document.createElement("span");
  iconText.textContent = textContent;

  iconElement.append(iconImg, iconText);
  return iconElement;
}
