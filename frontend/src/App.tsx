import { useState } from 'react';

import { Greet } from '../wailsjs/go/main/App.js';
import logo from './assets/images/logo-universal.png';

import './App.css';

function App() {
  const [resultText, setResultText] = useState<string>('Please enter your name below 👇');
  const [name, setName] = useState<string>('');

  function greet(): void {
    Greet(name).then((result) => setResultText(result));
  }

  return (
    <main>
      <img alt='Wails logo' id='logo' src={logo} />
      <div className='result' id='result'>
        {resultText}
      </div>
      <div className='input-box' id='input'>
        <input
          autoComplete='off'
          className='input'
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className='btn' onClick={greet}>
          Greet
        </button>
      </div>
    </main>
  );
}

export default App;
