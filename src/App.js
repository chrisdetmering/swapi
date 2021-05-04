import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header';
import { SwapiTable } from './components/Table';
import { swapiContext } from './context/Context';

function App() {
  const [characters, setCharacters] = useState([]);

  return (
    <div className='App'>
      <swapiContext.Provider value={{ characters, setCharacters }}>
        <Header />
        <SwapiTable />
      </swapiContext.Provider>
    </div>
  );
}

export default App;
