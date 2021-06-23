/* IMPORTS */
import React from 'react'
/* ------ */

export const GameCTA = ({ fn, text }) => {
  return (
    <button type="button" onClick={() => fn()}>
      {text}
    </button>
  )
}


