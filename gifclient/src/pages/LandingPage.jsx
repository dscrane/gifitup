import React from "react";
import { useSession } from "../store/store";

export const LandingPage = () => {
  const session = useSession(state => state.session);
  console.log(session)
  const initializeSession = useSession(state => state.initializeSession)
  console.log(session)
  return (
    <div>
      <div>
        <button onClick={() => {initializeSession()}}>Begin</button>
      </div>
    </div>
  )
}