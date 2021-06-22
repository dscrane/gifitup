const searchParams = {
  sort: "relevant",
  rating: "r",
  limit: 7,
  type: "gifs",
  lang: "en",
};

export const giphyFetch = async (gf, type, category, params) => {
  let resp;
  switch (type) {
    case "byId":
      resp = await gf.gifs([params]);
      break;
    case "single":
      resp = await gf.random({ tag: category });
      break;
    case "trending":
      resp = await gf.trending({ offset: params, ...searchParams });
      break;
    case "category":
      resp = await gf.search(category, {
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
