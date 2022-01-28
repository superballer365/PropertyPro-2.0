const chromium = require("chrome-aws-lambda");
const { parseZillowPage, parseZillowHtmlString } = require("./zillowParser");
const {
  parseApartmentsPage,
  parseApartmentsHtmlString,
} = require("./apartmentsParser");
const os = require("os");
const fs = require("fs");
async function getListingPicturesHandler(ctx) {
  let result = null;
  let browser = null;
  let error = null;

  const parser = getParser(ctx.arguments.listingUrl);
  if (!parser) return [];

  try {
    if (os.platform() === "darwin") {
      // local
      if (ctx.arguments.listingUrl.includes("zillow")) {
        const buffer = fs.readFileSync("zillowTest.txt");
        const test = buffer.toString();
        return parseZillowHtmlString(test);
      } else {
        const buffer = fs.readFileSync("apartmentsTest.txt");
        const test = buffer.toString();
        return parseApartmentsHtmlString(test);
      }
    }
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();

    await page.goto(ctx.arguments.listingUrl);

    result = await parser(page);
    return result;
  } catch (error) {
    console.error(error);
    error = error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
  if (error) throw error;

  return result;
}

function getParser(listingUrl) {
  if (listingUrl.includes("zillow")) return parseZillowPage;
  if (listingUrl.includes("apartments.com")) return parseApartmentsPage;
  return undefined;
}

// const configureSelenium = () => {
//   let webDriverPath = undefined;
//   if (os.platform() === "darwin") {
//     webDriverPath = __dirname + "/drivers/mac/";
//   } else if (os.platform() === "linux") {
//     webDriverPath = "/var/task/drivers/linux/";
//   }
//   if (!webDriverPath)
//     throw new Error("No web driver exists for the current platform");
//   if (!fs.existsSync(webDriverPath))
//     throw new Error(
//       `Web driver for ${os.platform} not found at the expected location`
//     );

//   process.env.PATH = process.env.PATH || "";
//   process.env.PATH = webDriverPath + path.delimiter + process.env.PATH;

//   const firefoxPath = webDriverPath + "firefox";
//   const edgePath = new edge.Options().set
//   const options = new firefox.Options();
//   console.log(process.env.PATH);
//   options.headless();
//   options.setBinary("/var/task/drivers/linux/firefox/firefox");
//   let driver = new Builder()
//     .forBrowser("firefox")
//     .setFirefoxOptions(options)
//     .setEdgeOptions()
//     .build();

//   console.log("Selenium setup complete");

//   return driver;
// };

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
