import Tabs from './Tabs.js';
import List from './List.js';
import Table from './Table.js';

import './index.css';

import { useState, useEffect } from 'react';

function App() {
  const [selected, setSelected] = useState('users');

  const [listItems, setListItems] = useState([]);

  // Whenever selected tab is changed, load its new data and pass set listItems to the data
  useEffect(() => {
    const fetchData = async () => {
      let newData = await fetch(`https://jsonplaceholder.typicode.com/${selected}`);
      let json = await newData.json();

      setListItems(json);
    }

    fetchData();
  }, [selected]);

  return (
    <div className="App">
      <Tabs
        selected={selected}
        setSelected={setSelected}
      />
      {/* Uncomment below for Part A */}
      {/* <List listItems={listItems} /> */}

      {/* Create a table each line of JSON data in the current request */}
      <Table listItems={listItems} />
    </div>
  );
}

export default App;
