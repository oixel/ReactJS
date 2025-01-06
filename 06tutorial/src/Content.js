import { useState } from 'react';

const Content = () => {
    // Set initial state of name to Oixel
    const [name, setName] = useState('Oixel');

    // Gives a random name from list of 3 names!
    const handleNameChange = () => {
        const names = ['Bob', 'Kevin', 'Stuart'];
        const int = Math.floor(Math.random() * 3);

        // Use state's update function to update the displayed name!
        setName(names[int]);
    }

    const handleClick = () => {
        console.log("You clicked it!");
    }

    const handleClick2 = (name) => {
        console.log(`${name} was clicked!`);
    }

    const handleClick3 = (e) => {
        console.log(e.target.innerText);
    }

    return (
        <main>
            <p onDoubleClick={handleClick}>
                Hello {name}!
            </p>
            <button onClick={handleNameChange}>Change Name</button>
            <button onClick={() => handleClick2('Oixel')}>Click It</button>
            <button onClick={(e) => handleClick3(e)}>Click It</button>
        </main >
    )
}

export default Content