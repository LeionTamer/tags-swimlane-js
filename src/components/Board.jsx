import React, { useReducer, useState } from 'react'
import Card from './Card'

const BOARD_STYLES = {
  height: '100vh',
  width: '256px',
  backgroundColor: 'green'
}

export default function Board() {
  const [cardList, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      default:
        return state
    }
  }, [
    { id: 1, text: 'Hello' },
    { id: 2, text: 'World' }
  ])

  return (
    <div style={BOARD_STYLES}>
      {cardList.map((item, index) => (<Card key={index} id={item.id} text={item.text} dispatch={dispatch} />))}
    </div>
  )
}
