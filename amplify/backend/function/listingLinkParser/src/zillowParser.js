const { parse } = require("node-html-parser");

function parseZillow(pageSourceString) {
  const root = parse(pageSourceString);

  const images = root.getElementsByTagName("img");
  const imageUrls = images.map((img) => img.getAttribute("src"));
  return imageUrls;
}

module.exports = { parseZillow };
