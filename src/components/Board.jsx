import React, { useReducer, useState } from 'react'
import Card from './Card'

const INPUT_STYLES = {
  width: "95%"
}
const TAG_ACTIONS = {
  ADD: 'add'
}

export default function Board({ tagCounter }) {
  const [newTag, setNewTag] = useState('')
  const [cardList, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case TAG_ACTIONS.ADD:
        return [
          ...state,
          { ...action.tagInfo }
        ]
      default:
        return state
    }
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch({
        type: TAG_ACTIONS.ADD, tagInfo: {
          id: tagCounter(),
          text: newTag
        }
      })
      setNewTag('')
    }
  }

  return (
    <div className="board">
      <div>
        <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={handleKeyDown} style={INPUT_STYLES} />
      </div>
      {cardList.map((item, index) => (<Card key={index} id={item.id} text={item.text} dispatch={dispatch} />))}
    </div>
  )
}
