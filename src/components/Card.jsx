import React, { useState } from 'react'
import { TAG_ACTIONS } from '../enum'

export default function Card({ id, text, draggable = true, dispatch }) {
  const [tagText, setTagText] = useState(text)
  const [editTag, setEditTag] = useState(false)

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (tagText.length === 0) deleteTag(id)
      setEditTag(false)
      console.log('Enter Key Was Pressed')
    }
  }

  const deleteTag = (id) => {
    dispatch({
      type: TAG_ACTIONS.DELETE,
      id: id
    })
  }

  const handleCardInputKeyDown = (event) => {
    if (!editTag && event.key === 'Delete') {
      deleteTag(id)
    }
  }

  if (!editTag) {
    return (
      <div
        className="card"
        draggable
        onKeyDown={handleCardInputKeyDown}
        onDoubleClick={() => setEditTag(true)}
        tabIndex="0">
        {tagText}
      </div>
    )
  }

  return (
    <div
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
