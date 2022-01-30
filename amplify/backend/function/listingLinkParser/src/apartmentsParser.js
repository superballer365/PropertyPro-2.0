const { parse } = require("node-html-parser");
const { isNumeric } = require("./utils");

async function parseApartmentsPage(page) {
  const pageContent = await page.content();

  return parseApartmentsHtmlString(pageContent);
}

function parseApartmentsHtmlString(htmlString) {
  const root = parse(htmlString);

  const images = parseImages(root);
  const beds = parseBeds(root);
  const baths = parseBaths(root);
  const price = parsePrice(root);

  return {
    price,
    numberOfBedrooms: beds,
    numberOfBathrooms: baths,
    pictures: images,
  };
}

function parsePrice(root) {
  try {
    const priceElement = root.querySelectorAll(".rentInfoDetail")[0];
    let priceString = priceElement.text;
    // remove first character, which should be '$'
    priceString = priceString.replace(",", "").substring(1);
    return isNumeric(priceString) ? parseFloat(priceString) : undefined;
  } catch (e) {
    console.log("Failed to parse price");
    console.error(e);
    return undefined;
  }
}

function parseBeds(root) {
  try {
    const bedsElement = root.querySelectorAll(".rentInfoDetail")[1];
    let bedsString = bedsElement.text.replace(" bd", "");
    return isNumeric(bedsString) ? parseFloat(bedsString) : undefined;
  } catch (e) {
    console.log("Failed to parse beds");
    console.error(e);
    return undefined;
  }
}

function parseBaths(root) {
  try {
    const bathsElement = root.querySelectorAll(".rentInfoDetail")[2];
    let bathsString = bathsElement.text.replace(" ba", "");
    return isNumeric(bathsString) ? parseFloat(bathsString) : undefined;
  } catch (e) {
    console.log("Failed to parse baths");
    console.error(e);
    return undefined;
  }
}

function parseImages(root) {
  let imageUrls = [];
  // TODO: fix the fact that this only gets the first 9 images
  const galleryItemImages = root.querySelectorAll(".galleryItemImage");
  galleryItemImages.forEach((galleryItem) => {
    const images = galleryItem.getElementsByTagName("meta");
    images.forEach((imageElement) => {
      imageUrls.push(imageElement.getAttribute("content"));
    });
  });
  return imageUrls;
}

module.exports = { parseApartmentsPage, parseApartmentsHtmlString };
