import React, { useReducer, useState } from 'react'
import Card from './Card'
import { TAG_ACTIONS } from '../enum'

export default function Board({ tagCounter }) {
  const [newTag, setNewTag] = useState('')
  const [cardList, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case TAG_ACTIONS.ADD:
        return [
          ...state,
          { ...action.tagInfo }
        ]
      case TAG_ACTIONS.DELETE:
        return state.filter(tag => tag.id !== action.id)
      default:
        return state
    }
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && newTag.length !== 0) {
      dispatch({
        type: TAG_ACTIONS.ADD, tagInfo: {
          id: tagCounter(),
          text: newTag
        }
      })
      setNewTag('')
    }
  }

  const handleDragEnter = (event) => {
    event.preventDefault()
    event.target.classList.add('dragOver')
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.target.classList.add('dragOver')
  }

  const handleDragLeave = (event) => {
    event.target.classList.remove('dragOver')
  }

  const handleDrop = (event) => {
    event.target.classList.remove('dragOver')
    const tagText = event.dataTransfer.getData('text')
    dispatch({
      type: TAG_ACTIONS.ADD, tagInfo: {
        id: tagCounter(),
        text: tagText
      }
    })
  }

  return (
    <div className="board"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div>
        <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={handleKeyDown} />
      </div>
      {cardList.map((item) => (<Card key={item.id} id={item.id} text={item.text} dispatch={dispatch} />))}
    </div>
  )
}
