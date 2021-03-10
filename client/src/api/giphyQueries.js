const defaultParams = {
  search: {
    sort: "relevant",
    limit: "150",
    offset: 0,
    rating: "g",
    type: "gifs",
    lang: "en",
  },
  random: {
    rating: "g",
  },
  trending: {
    limit: "150",
    offset: 0,
    rating: "g",
    type: "gifs",
    lang: "en",
  },
};

export async function giphyCategory(gf, category) {
  const { data: gifs } = await gf.gifs(category);
  return gifs;
}

export async function giphySearch(gf, query, params) {
  const { data: gifs } = await gf.search(query, {
    ...defaultParams.search,
    ...params,
  });
  return gifs;
}

export async function giphyTrending(gf, params) {
  const { data: gifs } = await gf.trending({
    ...defaultParams.trending,
    ...params,
  });
  return gifs;
}

export async function giphyRandom(gf, tag, params) {
  const { data: gifs } = await gf.random({
    ...defaultParams.random,
    ...params,
    tag,
  });
  return gifs;
}
