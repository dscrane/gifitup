import { giphyFetch } from "../../api/fetchFromGiphy";
import { gf } from "../../config/giphySDK";

export const giphyStore = (set) => ({
  giphyCategory: "memes",
  giphyType: "gifs",
  sessionGifs: [],
  tableGifs: [],
  noGifs: false,
  setInitialGifs: async (category, type, offset) => {
    const gifs = await giphyFetch(gf, type, "search", category, offset);
    console.info("[GIF]: setting initial gifs...", gifs);
    set((state) => {
      return {
        sessionGifs: [...gifs],
      };
    });
  },
  pullNewGif: async (giphyCategory, giphyType) => {
    const gif = await giphyFetch(gf, giphyType, "random", giphyCategory);
    console.info("[GIF]: fetching new gif...", gif.id);
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
  toggleGiphyType: (type) => {
    set((state) => {
      return {
        giphyType: type,
      };
    });
  },
});
