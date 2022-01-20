import React, { useState } from 'react'
import { TAG_ACTIONS } from '../enum'

export default function Card({ id, text, dispatch }) {
  const [tagText, setTagText] = useState(text)
  const [editTag, setEditTag] = useState(false)

  const deleteTag = (id) => {
    dispatch({
      type: TAG_ACTIONS.DELETE,
      id: id
    })
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (tagText.length === 0) deleteTag(id)
      dispatch({
        type: TAG_ACTIONS.EDIT,
        id: id,
        text: tagText
      })
      setEditTag(false)
    }
  }

  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', id)
  }

  const handleDragEnd = (event) => {
    if (event.dataTransfer.dropEffect !== 'none') {
      setTimeout(() => {
        dispatch({
          type: TAG_ACTIONS.DELETE,
          id: id
        })
      }, 1000)
    }
  }

  const handleCardInputKeyDown = (event) => {
    if (!editTag && event.key === 'Delete') {
      deleteTag(id)
    }
  }

  if (!editTag) {
    return (
      <div
        id={`card-${id}`}
        className="card"
        draggable
        onKeyDown={handleCardInputKeyDown}
        onDoubleClick={() => setEditTag(true)}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
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
        className="cardInput"
        onKeyPress={handleInputKeyDown}
        onChange={e => setTagText(e.target.value)}
      />
    </div >
  )
}
