import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Content = () => {
    // Set initial state of items to a list of grocery items
    const [items, setItems] = useState([
        {
            id: 1,
            checked: false,
            item: "One half pound bag of Cocoa Covered Almonds Unsalted"
        },
        {
            id: 2,
            checked: false,
            item: "Item 2"
        },
        {
            id: 3,
            checked: false,
            item: "Item 3"
        }
    ]);

    const handleCheck = (id) => {
        // Update checked state of clicked checked box (by searching for its ID)
        const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);

        // Update state of items to display new checked state
        setItems(listItems);

        // Store new state in local storage to allow user to return to this state later
        localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    }

    const handleDelete = (id) => {
        // listItems will only contain items that do not have the passed-in ID
        const listItems = items.filter((item) => item.id !== id);

        // Update state of items to remove deleted item from list!
        setItems(listItems);

        // Store new state in local storage to allow user to return to this state later
        localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    }

    return (
        <main>
            {/* If list is not empty, display items */}
            {items.length ? (
                <ul>
                    {items.map((item) => (
                        <li className="item" key={item.id}>
                            <input
                                type="checkbox"
                                onChange={() => handleCheck(item.id)}
                                checked={item.checked}
                            />
                            <label
                                style={(item.checked) ? { textDecoration: 'line-through' } : null}
                                onDoubleClick={() => handleCheck(item.id)}
                            >{item.item}</label>
                            <FaTrashAlt
                                onClick={() => handleDelete(item.id)}
                                role="button"
                                tabIndex="0"
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                // Otherwise, display empty list message
                <p style={{ marginTop: '2rem' }}>Your grocery list is empty.</p>
            )}
        </main >
    )
}

export default Content