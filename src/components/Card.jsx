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
    event.dataTransfer.setData('text/plain', tagText)
  }

  const handleDragEnd = (event) => {
    if (event.dataTransfer.dropEffect !== 'none') {
      dispatch({
        type: TAG_ACTIONS.DELETE,
        id: id
      })
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
        id={`input-${id}`} // TODO: Do I need this ID?
        className="cardInput"
        onKeyPress={handleInputKeyDown}
        onChange={e => setTagText(e.target.value)}
      />
    </div >
  )
}
