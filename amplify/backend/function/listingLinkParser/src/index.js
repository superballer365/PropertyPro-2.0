const chromium = require("chrome-aws-lambda");
const { parseZillow } = require("./zillowParser");

async function getListingPicturesHandler(ctx) {
  let result = null;
  let browser = null;
  let error = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();

    await page.goto(ctx.arguments.listingUrl);
    const pageContent = await page.content();

    result = parseZillow(pageContent);
    return result;
  } catch (error) {
    error = error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
  if (error) throw error;

  return result;
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
