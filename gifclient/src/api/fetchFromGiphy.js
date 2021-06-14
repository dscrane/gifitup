import {
  giphySearch,
  giphyTrending,
  giphyCategory,
  giphyRandom,
} from "./giphyQueries";

export const fetchFromGiphy = (gf, category, query, params) => {
  switch (category) {
    case "after hours":
      return giphySearch(gf, query, params);
    case "memes":
      return giphySearch(gf, query, params);
    case "trending":
      return giphyTrending(gf, params);
    case "random":
      return giphyRandom(gf, query, params);
    default:
      console.log("broken switch");
  }
};
