import React, { useState } from 'react'

export default function Card({ id, text, draggable = true, dispatch }) {
  const [tagText, setTagText] = useState(text)
  const [editTag, setEditTag] = useState(false)

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      // TODO: Add dispatch DELETE function
      setEditTag(false)
      console.log('Enter Key Was Pressed')
    }
  }

  const handleCardInputKeyDown = (event) => {
    if (!editTag && event.key === 'Delete') {
      console.log('Should dispatch DELETE function')
      // event.preventDefault()
    }
  }

  if (!editTag) {
    return (
      <div
        className="card"
        draggable
        onKeyDown={handleCardInputKeyDown}
        onClick={e => e.preventDefault()}
        onDoubleClick={() => setEditTag(true)}>
        {tagText}
      </div>
    )
  }

  return (
    <div
      draggable={draggable}
      className="card"
    >
      <input
        type="text"
        value={tagText}
        id={`input-${id}`}
        className="cardInput"
        onKeyPress={handleInputKeyDown}
        onChange={e => setTagText(e.target.value)}
      />
    </div >
  )
}
