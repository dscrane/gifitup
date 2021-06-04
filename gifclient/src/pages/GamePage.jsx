import React, { useEffect } from "react";
import { usePlayers, useSession } from "../store/store";
import { io } from "socket.io-client";
import { Sidebar } from "../components/Sidebar";
import { GameSpace } from "../components/GameSpace";

export const GamePage = () => {
  const [players, addPlayer] = usePlayers((state) => [
    state.players,
    state.addPlayer,
  ]);
  const [session, updateSession] = useSession((state) => [
    state.session,
    state.updateSession,
  ]);

  console.log(players, session);
  useEffect(() => {
    const connectToSocket = async () => {
      console.log("trying to connect");
      const socket = io("http://localhost:5500");
      socket.on("initial-connection", ({ data }) => {
        console.log("eventData", data);
        updateSession(data);
      });
    };
    connectToSocket();
  }, []);
  useEffect(() => {
    if (session.socket) {
      session.socket.on("joined-room", ({ data }) => console.log(...data));
    }
  }, [session.socket]);

  return (
    <>
      <div className="app__sidebar">
        <Sidebar socket={session.socket} />
      </div>
      <div className="app__gamespace">
        <GameSpace />
      </div>
    </>
  );
};
