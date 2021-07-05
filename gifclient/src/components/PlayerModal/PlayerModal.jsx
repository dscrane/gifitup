/* IMPORTS */
import React,{ useEffect } from 'react'
import { useSessionStore } from '../../store/store'
import { PlayerPage } from "../../pages"
/* ------ */

export const PlayerModal = () => {
  const [displayPlayerModal, togglePlayerModal] = useSessionStore(state => [state.displayPlayerModal, state.togglePlayerModal])



  return (
    <div>
      { displayPlayerModal ? <PlayerPage /> : null}
    </div>
  )
}


