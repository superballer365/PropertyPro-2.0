const { parse } = require("node-html-parser");

async function parseZillow(driver, listingUrl) {
  try {
    await driver.get(listingUrl);
    const pageSourceString = await driver.getPageSource();

    const root = parse(pageSourceString);

    const images = root.getElementsByTagName("img");
    const imageUrls = images.map((img) => img.getAttribute("src"));
    return imageUrls;
  } catch (e) {
    console.error(e);
  }
  return [];
}

module.exports = { parseZillow };
