const { parse } = require("node-html-parser");

function parseZillow(pageSourceString) {
  const root = parse(pageSourceString);

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

module.exports = { parseZillow };
