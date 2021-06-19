import {
  giphySearch,
  singleGif,

} from "./giphyQueries";

export const giphyFetch = async (gf, category, params) => {
  switch (category) {
    case "unique":
      return await singleGif(gf, params);
    case "memes":
      return await giphySearch(gf, category, params);
    case "trending":
      // return await giphyTrending(gf, params);
    case "random":
      // return await giphyRandom(gf, category, params);
    default:
      console.log("broken switch");
  }
};
