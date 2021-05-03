import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { swapiContext } from '../context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import './Table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

export const SwapiTable = () => {
  const { characters, setCharacters } = useContext(swapiContext);
  const [characterData, setCharacterData] = useState(characters);
  const apiURL = `https://swapi.dev/api/`;

  useEffect(() => {
    const fetchCharacters = async () => {
      for (let i = 1; i < 10; i++) {
        let response = await Axios(`${apiURL}people/?page=${i}`);
        let cleanData = response.data.results.map(character => {
          return {
            ...character,
            gender: handleGender(character.gender),
            homeworld: handleHomeworld(character.homeworld).toString(),
          };
        });
        setCharacters(characters => characters.concat(cleanData));
      }
    };
    fetchCharacters();
  }, []);

  useEffect(() => {
    setCharacterData(characters);
  }, [characters]);

  const handleGender = person => {
    switch (person) {
      case 'male':
        return 'Male';
      case 'female':
        return 'Female';
      case 'none':
      case 'n/a':
        return 'Droid';
      case 'hermaphrodite':
        return 'Hermaphrodite';
      default:
        return person.gender;
    }
  };

  const handleHomeworld = async props => {
    let result = await Axios.get(`${props}`);
    console.log(result.data.name);
  };

  const columns = [
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'gender', text: 'Gender', sort: true },
    { dataField: 'height', text: 'Height', sort: true },
    { dataField: 'mass', text: 'Mass', sort: true },
    { dataField: 'birth_year', text: 'Birth Year', sort: true },
    { dataField: 'homeworld', text: 'Homeworld' },
    // { dataField: 'films', text: 'Films' },
    // { dataField: 'vehicles', text: 'Vehicle' },
    // { dataField: 'starships', text: 'Starships' },
  ];

  const defaultSorted = [
    {
      dataField: 'name',
      order: 'desc',
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: false,
    // onPageChange: function (page, sizePerPage) {
    // },
    // onSizePerPageChange: function (page, sizePerPage) {
    // },
  });

  const { SearchBar, ClearSearchButton } = Search;

  return (
    <ToolkitProvider
      bootstrap4
      keyField='name'
      data={characterData}
      columns={columns}
      search>
      {props => (
        <div>
          <SearchBar placeholder='Force Seach...' {...props.searchProps} />
          <ClearSearchButton {...props.searchProps} />
          <BootstrapTable
            rowClasses='custom-row-class'
            // hover='true'
            // striped='false'
            defaultSorted={defaultSorted}
            pagination={pagination}
            {...props.baseProps}
          />
        </div>
      )}
    </ToolkitProvider>
  );
};

export default SwapiTable;
