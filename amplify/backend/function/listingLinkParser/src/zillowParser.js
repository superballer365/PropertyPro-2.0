const { parse } = require("node-html-parser");

async function parseZillow(listingHTMLString) {
  const root = parse(listingHTMLString);

  const images = root.getElementsByTagName("img");
  const imageUrls = images.map((img) => img.getAttribute("src"));
  return imageUrls;
}

module.exports = { parseZillow };
