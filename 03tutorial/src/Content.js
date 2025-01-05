import React from 'react'

const Content = () => {
    // Gives a random name from list of 3 names!
    const handleNameChange = () => {
        const names = ['Bob', 'Kevin', 'Stuart'];
        const int = Math.floor(Math.random() * 3);
        return names[int];
    }

    return (
        <p>
            Hello {handleNameChange()}!
        </p>
    )
}

export default Content