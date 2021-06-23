import { giphyFetch } from '../../api/fetchFromGiphy'
import { gf } from '../../config/giphySDK'

export const giphyStore = (set) => ({
  giphyCategory: "memes",
  sessionGifs: [],
  tableGifs: [],
  noGifs: false,
  setGiphySDK: (giffyFetch) => {
    console.info("[GIF]: setting api instance...");
    set((state) => {
      return {
        giphyInstance: giffyFetch,
      };
    });
  },
  setInitialGifs: async (giphyCategory, queryOffset) => {
    const gifs = await giphyFetch(
      gf,
      "category",
      giphyCategory,
      queryOffset
    );
    console.info("[GIF]: setting initial gifs...", gifs);
    set((state) => {
      return {
        sessionGifs: [...gifs],
      };
    });
  },
  pullNewGif: async (giphyCategory) => {
    const gif = await giphyFetch(
      gf,
      "single",
      giphyCategory,
    );
    console.info("[GIF]: fetching new gif...", gif);
    set((state) => {
      return {
        sessionGifs: [gif, ...state.sessionGifs],
      };
    });
  },
  addGifToTable: (gif) => {
    console.info("[GIF]: updating table gifs...");
    set((state) => {
      return {
        tableGifs: [gif, ...state.tableGifs],
      };
    });
  },
  removeGifFromHand: (gifId) => {
    console.info("[GIF]: removing gif from hand...", gifId);
    set((state) => {
      const currentGifs = state.sessionGifs;
      return {
        sessionGifs: [...currentGifs.filter((gif) => gif.id !== gifId)],
      };
    });
  },
  handleNoGifReturn: () => {
    console.info("[GIF]: no gifs returned...");
    set((state) => {
      return {
        noGifs: true,
      };
    });
  },
});
