import React, { useState, useEffect, useContext } from 'react';

export const Header = () => {
  return (
    <header>
      <h1>SWAPI-V</h1>
      {/* <div className='filters'>
        <input type='text' className='search' placeholder='Force Search...' />
        <select className='selectCategory'>
          <option value='people'>people</option>
          <option value='planets'>planets</option>
          <option value='starships'>starships</option>
        </select>
        <select className='filterResults'>
          <option value='All Sides'>All</option>
          <option value='light'>Light Side</option>
          <option value='dark'>Dark Side</option>
        </select>
      </div> */}
    </header>
  );
};

export default Header;
