import React, { useState } from 'react'

const CARD_STYLES = {
  minHeight: '20px',
  padding: '10px',
  margin: '5px',
  backgroundColor: 'white'
}

export default function Card({ id, text, draggable = true, dispatch }) {
  const [tagText, setTagText] = useState(text)
  const [disabled, setDisabled] = useState(true)

  const handleClick = (event) => {
    console.log(`event.detail = ${event.detail}`)
    if (event.detail === 1) {
      setDisabled(true)
    }
    if (event.detail === 2) {
      setDisabled(false)
      document.getElementById(`input-${id}`).focus()
      document.getElementById(`input-${id}`).select()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Delete') {
      console.log(`Delete Key was pressed for id: ${id} disabled: ${disabled}`)
    }
  }

  return (
    <div
      style={CARD_STYLES}
      draggable={draggable}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <input
        type="text"
        value={tagText}
        onChange={e => setTagText(e.target.value)}
        disabled={disabled}
        id={`input-${id}`}
        className="cardInput" />
    </div >
  )
}
