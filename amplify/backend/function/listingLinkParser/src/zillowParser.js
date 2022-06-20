const { parse } = require("node-html-parser");
const { isNumeric } = require("./utils");

async function parseZillowPage(page) {
  const pageContent = await page.content();

  return parseZillowHtmlString(pageContent);
}

function parseZillowHtmlString(htmlString) {
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
    let priceString = root.querySelector('[data-testid="price"]').firstChild
      .textContent;
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
    const bedsElement = root.querySelectorAll(
      '[data-testid="bed-bath-item"]'
    )[0].firstChild;
    let bedsString = bedsElement.textContent;
    return isNumeric(bedsString) ? parseFloat(bedsString) : undefined;
  } catch (e) {
    console.log("Failed to parse beds");
    console.error(e);
    return undefined;
  }
}

function parseBaths(root) {
  try {
    const bathsElement = root.querySelectorAll(
      '[data-testid="bed-bath-item"]'
    )[1].firstChild;
    let bathsString = bathsElement.textContent;
    return isNumeric(bathsString) ? parseFloat(bathsString) : undefined;
  } catch (e) {
    console.log("Failed to parse baths");
    console.error(e);
    return undefined;
  }
}

function parseImages(root) {
  let imageUrls = [];
  // TODO: fix the fact that this only gets the first 7 images
  const mediaStreamTiles = root.querySelectorAll(".media-stream-tile");
  mediaStreamTiles.forEach((tileElement) => {
    const images = tileElement.getElementsByTagName("img");
    images.forEach((imageElement) => {
      imageUrls.push(imageElement.getAttribute("src"));
    });
  });
  return imageUrls;
}

module.exports = { parseZillowPage, parseZillowHtmlString };
