const searchParams = {
  sort: "relevant",
  rating: "r",
  limit: 7,
  type: "gifs",
  lang: "en",
};

export const giphyFetch = async (gf, type, query, category, params) => {
  //TODO:
  // add ability to set either 'gifs' or 'images'

  let resp;
  switch (query) {
    case "byId":
      resp = await gf.gifs([params]);
      break;
    case "random":
      resp = await gf.random({ tag: category, type });
      break;
    case "trending":
      resp = await gf.trending({ type, offset: params, ...searchParams });
      break;
    case "search":
      resp = await gf.search(category, {
        type,
        offset: params,
        ...searchParams,
      });
      break;
    default:
      console.log("[__ERROR__]: giphyFetch switch");
      resp = { data: null };
  }
  return resp.data;
};
