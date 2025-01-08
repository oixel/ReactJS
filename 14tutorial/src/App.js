import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';

import { useState, useEffect } from 'react';

import apiRequest from './apiRequest';

function App() {
  // Store fetch URL
  const API_URL = 'http://localhost:3500/items';

  // Initialize items list to empty list, items will be pulled from server database
  const [items, setItems] = useState([]);

  // Stores new item to be added to list
  const [newItem, setNewItem] = useState('');

  // Stores the current searched item
  const [search, setSearch] = useState('');

  // Stores whether an error occurred during fetch
  const [fetchError, setFetchError] = useState(null);

  // Stores whether the data fetching is actively occurring 
  const [isLoading, setIsLoading] = useState(true);

  // Use useEffect with a [] dependency to only update when initially opened rather than at every render
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Attempt to fetch the data from database
        const response = await fetch(API_URL);

        // If data was not reached, then throw error
        if (!response.ok) throw Error('Did not receive expected data');

        // If no error occurred, set list of items to fetched data
        const listItems = await response.json();
        setItems(listItems);

        // If no error occurred, update error state to null
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    // Simulates the delay that might occur from fetching on a non-locally hosted server
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  // Handle adding item to list
  const addItem = async (item) => {
    // If items in list, set id to next integer, else if list is empty, set ID to 1
    const id = String(Number(items.at(-1)?.id || 0) + 1);

    // Create new item object and add it to list
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];

    // Update state of list to contain additional new item
    setItems(listItems);

    // Set options to be a POST request containing the newly added item
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    // Use custom api request function on stored api url
    const result = await apiRequest(API_URL, postOptions);

    // If error occurred, then display it
    if (result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    // Update checked state of clicked checked box (by searching for its ID)
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);

    // Update state of list to contain new checked state for checked item
    setItems(listItems);

    // Since it is a PATCH request, only a single item has to be updated (the one with a different checked state)
    const myItem = listItems.filter((item) => item.id === id);

    // Set options to update request with updated checked state
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };

    // Request URL is specific to item that is updated
    const requestUrl = `${API_URL}/${id}`;

    // Go to specific URL and update the checked state in database
    const result = await apiRequest(requestUrl, updateOptions);

    // If error occurred, update error state to display it
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    // listItems will only contain items that do not have the passed-in ID
    const listItems = items.filter((item) => item.id !== id);

    // Update state of list to be list with removed item not present
    setItems(listItems);

    // Delete options are super easy since we will go to specific item's request URL and delete it from there
    const deleteOptions = { method: 'DELETE' };

    // Request URL is specific to item that is to be deleted
    const requestUrl = `${API_URL}/${id}`;

    // Go to specific URL and delete it from the database
    const result = await apiRequest(requestUrl, deleteOptions);

    // If error occurred, update error state to display it
    if (result) setFetchError(result);
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
      <main>
        {isLoading && <p>Loading Items...</p>}

        {/* If error, do not display error message instead of list content */}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
