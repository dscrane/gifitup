import create from "zustand";
import { devtools } from "zustand/middleware";
import { sessionStore, giphyStore, emitterStore, playerStore } from "./stores";

export const useSessionStore = create(devtools(sessionStore, "sessionStore"));
export const useEmitterStore = create(devtools(emitterStore, "emitterStore"));
export const useGiphyStore = create(devtools(giphyStore, "giphyStore"));
export const usePlayerStore = create(devtools(playerStore, "playerStore"));
