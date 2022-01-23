const axios = require("axios");
const os = require("os");
const { parseZillow } = require("./zillowParser");

async function getListingPicturesHandler(ctx) {
  console.log(os.platform());
  console.log(os.type());
  const response = (await axios.get(ctx.arguments.listingUrl)).data;
  return parseZillow(response);
}

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
