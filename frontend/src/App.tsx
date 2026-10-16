import { useState } from 'react';

import { Greet } from '../wailsjs/go/main/App.js';
import logo from './assets/images/logo-universal.png';

import styles from './App.module.css';

function App() {
  const [resultText, setResultText] = useState<string>('Please enter your name below 👇');
  const [name, setName] = useState<string>('');

  function greet(): void {
    Greet(name).then((result) => setResultText(result));
  }

  return (
    <main>
      <img alt='Wails logo' className={styles.logo} src={logo} />
      <div className={styles.result}>{resultText}</div>
      <div>
        <input
          autoComplete='off'
          className={styles.input}
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className={styles.btn} onClick={greet}>
          Greet
        </button>
      </div>
    </main>
  );
}

export default App;
