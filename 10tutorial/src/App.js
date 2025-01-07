import ColorBox from './ColorBox';
import ChangeColor from './ChangeColor';

import { useState } from 'react';

function App() {
  const [color, setColor] = useState('');

  return (
    <div className="App">
      <ColorBox
        color={color}
      />
      <ChangeColor
        color={color}
        setColor={setColor}
      />
    </div>
  );
}

export default App;
