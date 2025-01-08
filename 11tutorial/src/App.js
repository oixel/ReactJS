import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';

import { useState, useEffect } from 'react';

function App() {
  // Set initial state of items to list stored in local storage or empty list if nothing is stored, an empty list (instead of null)
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);

  // Stores new item to be added to list
  const [newItem, setNewItem] = useState('');

  // Stores the current searched item
  const [search, setSearch] = useState('');

  // Use useEffect with a dependency of items to only run when items gets updated (instead of every time render occurs)
  useEffect(() => {
    localStorage.setItem('shoppinglist', JSON.stringify(items));
  }, [items]);

  // Handle adding item to list
  const addItem = (item) => {
    // If items in list, set id to next integer, else if list is empty, set ID to 1
    const id = items.length ? items[items.length - 1].id + 1 : 1;

    // Create new item object and add it to list
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];

    // Update state of list to contain additional new item
    setItems(listItems);
  }

  const handleCheck = (id) => {
    // Update checked state of clicked checked box (by searching for its ID)
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);

    // Update state of list to contain new checked state for checked item
    setItems(listItems);
  }

  const handleDelete = (id) => {
    // listItems will only contain items that do not have the passed-in ID
    const listItems = items.filter((item) => item.id !== id);

    // Update state of list to be list with removed item not present
    setItems(listItems);
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
