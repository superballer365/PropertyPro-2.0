const axios = require("axios");
const os = require("os");
const fs = require("fs");
const path = require("path");
let chrome = require("selenium-webdriver/chrome");
let firefox = require("selenium-webdriver/firefox");
let { Builder } = require("selenium-webdriver");
const { parseZillow } = require("./zillowParser");

async function getListingPicturesHandler(ctx) {
  const driver = configureSelenium();
  return parseZillow(driver, ctx.arguments.listingUrl);
}

const configureSelenium = () => {
  let webDriverPath = undefined;
  if (os.platform() === "darwin") {
    webDriverPath = __dirname + "/drivers/mac/";
  } else if (os.platform() === "linux") {
    webDriverPath = __dirname + "/drivers/linux/";
  }
  if (!webDriverPath)
    throw new Error("No web driver exists for the current platform");
  if (!fs.existsSync(webDriverPath))
    throw new Error(
      `Web driver for ${os.platform} not found at the expected location`
    );

  process.env.PATH = process.env.PATH || "";
  process.env.PATH += webDriverPath + path.delimiter;

  const firefoxPath = webDriverPath + "firefox-bin";
  const options = new firefox.Options();
  options.headless();
  options.setBinary("/Applications/Firefox.app/Contents/MacOS/firefox");
  let driver = new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

  console.log("Selenium setup complete");

  return driver;
};

const resolvers = {
  Query: {
    getListingPictures: getListingPicturesHandler,
  },
};

// event
// {
//   "typeName": "Query", /* Filled dynamically based on @function usage location */
//   "fieldName": "me", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
