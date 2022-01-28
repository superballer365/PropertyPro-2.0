const { parse } = require("node-html-parser");

async function parseApartmentsPage(page) {
  const pageContent = await page.content();

  return parseApartmentsHtmlString(pageContent);
}

function parseApartmentsHtmlString(htmlString) {
  const root = parse(htmlString);

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
