import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';

import { useState } from 'react';

function App() {
  // Set initial state of items to list stored in local storage
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));

  // Stores new item to be added to list
  const [newItem, setNewItem] = useState('');

  // Stores the current searched item
  const [search, setSearch] = useState('');

  const setAndSaveItems = (newItems) => {
    // Update state of items to remove deleted item from list!
    setItems(newItems);

    // Store new state in local storage to allow user to return to this state later
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  // Handle adding item to list
  const addItem = (item) => {
    // If items in list, set id to next integer, else if list is empty, set ID to 1
    const id = items.length ? items[items.length - 1].id + 1 : 1;

    // Create new item object and add it to list
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];

    // Update state of list and store it in local storage
    setAndSaveItems(listItems);
  }

  const handleCheck = (id) => {
    // Update checked state of clicked checked box (by searching for its ID)
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);

    // Update state of list and store it in local storage
    setAndSaveItems(listItems);
  }

  const handleDelete = (id) => {
    // listItems will only contain items that do not have the passed-in ID
    const listItems = items.filter((item) => item.id !== id);

    // Update state of list and store it in local storage
    setAndSaveItems(listItems);
  }

  const handleSubmit = (e) => {
    // Prevents refresh on submission
    e.preventDefault();

    // Prevent adding an empty item
    if (!newItem) return;

    // Add new item to list
    addItem(newItem);

    // Reset state of new item to blank, to clear input line
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
