import { giphyFetch } from "../../api/fetchFromGiphy";
import { gf } from "../../config/giphySDK";
import { log } from "../../utils/logs";

export const giphyStore = (set) => ({
  giphyCategory: "memes",
  giphyType: "gifs",
  sessionGifs: [],
  tableGifs: [],
  noGifs: false,
  setInitialGifs: async (category, type, offset) => {
    const gifs = await giphyFetch(gf, type, "search", category, offset);
    log.gif("%c[GIF]: %csetting initial gifs...", gifs);
    set((state) => {
      return {
        sessionGifs: [...gifs],
      };
    });
  },
  pullNewGif: async (giphyCategory, giphyType) => {
    const gif = await giphyFetch(gf, giphyType, "random", giphyCategory);
    log.gif("%c[GIF]: %cpulling new gif...", gif.id);
    set((state) => {
      return {
        sessionGifs: [gif, ...state.sessionGifs],
      };
    });
  },
  addGifToTable: (gif) => {
    log.gif("%c[GIF]: %cadding gif to table...", gif.id);
    set((state) => {
      return {
        tableGifs: [gif, ...state.tableGifs],
      };
    });
  },
  removeGifFromHand: (gifId) => {
    log.gif("%c[GIF]: %cremoving gif from hand...", gifId);
    set((state) => {
      const currentGifs = state.sessionGifs;
      return {
        sessionGifs: [...currentGifs.filter((gif) => gif.id !== gifId)],
      };
    });
  },
  handleNoGifReturn: () => {
    log.gif("%c[GIF]: %cno gifs returned...");
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
