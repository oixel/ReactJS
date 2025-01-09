import Tabs from './Tabs.js';

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
      {/* Create a bulleted item for each line of JSON data in the current request */}
      <ul>
        {listItems.map((data, index) => <li id={index}>{JSON.stringify(data)}</li>)}
      </ul>
    </div>
  );
}

export default App;
