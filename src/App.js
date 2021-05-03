import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header';
import { SwapiTable } from './components/Table';
import { swapiContext } from './context/Context';

function App() {
  const [characters, setCharacters] = useState([
    {
      name: 'Duane',
      gender: 'male',
      height: '182',
      mass: '80',
      homeworld: 'Pennsylvania',
      birth_year: '1991AD',
      vehicles: "99' neon",
    },
  ]);

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
