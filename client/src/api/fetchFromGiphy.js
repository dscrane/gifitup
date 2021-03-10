import { giphySearch, giphyTrending, giphyCategory } from "./giphyQueries";

export const fetchFromGiphy = (gf, category, query, params) => {
  switch (category) {
    case "after hours":
      return giphySearch(gf, query, params);
    case "memes":
      return giphyCategory(gf, query, params);
    case "trending":
      return giphyTrending(gf, params);
    default:
      console.log("broken switch");
  }
};
