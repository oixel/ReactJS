import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import { useState } from 'react';

function App() {
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
    <div className="App">
      <Header title="Grocery List" />
      <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
