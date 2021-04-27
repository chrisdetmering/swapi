import React, { useState, useEffect, useContext } from 'react';
import { swapiContext } from '../context/Context';
import Axios from 'axios';

export const SwapiTable = () => {
  const { characters, setCharacters } = useContext(swapiContext);
  const [home, setHome] = useState('');
  const apiURL = `https://swapi.dev/api/`;

  const fetchCharacters = async () => {
    const response = await Axios(`${apiURL}people/`);
    setCharacters(response.data.results);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleGender = person => {
    switch (person) {
      case 'male':
        return 'Male';
      case 'female':
        return 'Female';
      case 'n/a':
        return 'Droid';
      default:
        return 'unidentified';
    }
  };

  //   const handleAPIReference = async links => {
  //     const response = await Axios(`${links}`);
  //     setHome(response.data.name);
  //     console.log(home);
  //     // return response.name;
  //   };
  return (
    <table className='table .table-responsive table-sm table-borderless table-dark table-hover table-striped '>
      <thead className='.thead-dark '>
        <tr>
          <th className='table-header'>Name</th>
          <th className='table-header'>Gender</th>
          <th className='table-header'>Height</th>
          <th className='table-header'>Mass</th>
          <th className='table-header'>Birth Year</th>
          <th className='table-header'>Homeworld</th>
          <th className='table-header'>Films</th>
          <th className='table-header'>Vehicles</th>
          <th className='table-header'>Starships</th>
        </tr>
      </thead>
      <tbody>
        {characters.map(char => (
          <tr key={char.name}>
            <td>{char.name}</td>
            <td>{handleGender(char.gender)}</td>
            <td>{char.height}cm</td>
            <td>{char.mass}kg</td>
            <td>{char.birth_year}</td>
            {/* <td>{handleAPIReference(char.homeworld)}</td> */}
            {/* <td>{char.films}</td> */}
            {/* <td>{char.vehicles}</td> */}
            {/* <td>{char.starships}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SwapiTable;
