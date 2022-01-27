const { parse } = require("node-html-parser");

async function parseZillowPage(page) {
  const pageContent = await page.content();

  return parseZillowHtmlString(pageContent);
}

function parseZillowHtmlString(htmlString) {
  const root = parse(htmlString);

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
