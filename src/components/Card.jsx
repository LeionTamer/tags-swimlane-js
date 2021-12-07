import React, { useState } from 'react'

const CARD_STYLES = {
  minHeight: '20px',
  padding: '10px',
  margin: '5px',
  backgroundColor: 'white'
}

export default function Card({ id, text, draggable = true, dispatch }) {
  const [tagText, setTagText] = useState('')
  const [disabled, setDisabled] = useState(true)

  const handleDoubleClick = () => {
    setDisabled(false)
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setDisabled(!disabled)
    }
    if (event.key === 'Delete' && disabled) {
      setTagText('')
    }
  }

  return (
    <div
      style={CARD_STYLES}
      draggable={draggable}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
    >
      <input
        type="text"
        value={tagText}
        onChange={e => setTagText(e.target.value)}
        onFocus={e => { console.log(`focused on ${id}`) }}
        onBlur={e => { console.log(`blurred on ${id}`) }}
        disabled={disabled} />
    </div>
  )
}
