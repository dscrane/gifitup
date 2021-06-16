import {
  giphySearch,
  giphyTrending,
  giphyCategory,
  giphyRandom,
} from "./giphyQueries";

export const giphyFetch = async (gf, category, params) => {
  console.log("giphy", gf, category, params);
  switch (category) {
    case "after hours":
      return await giphySearch(gf, category, params);
    case "memes":
      return await giphySearch(gf, category, params);
    case "trending":
      return await giphyTrending(gf, params);
    case "random":
      return await giphyRandom(gf, category, params);
    default:
      console.log("broken switch");
  }
};
