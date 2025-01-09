import React from 'react'

const TabButton = ({ textContent, selected, setSelected }) => {
    return (
        <button
            className={`${((selected === textContent) ? 'selected' : '')}`}
            type='button'
            onClick={() => setSelected(textContent)}
        >
            {textContent}
        </button>
    )
}

export default TabButton