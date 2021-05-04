import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import './Table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

export const SwapiTable = () => {
  const [characters, setCharacters] = useState([]);
  const [characterData, setCharacterData] = useState(characters);

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    setCharacterData(characters);
  }, [characters]);


  const fetchCharacters = async () => {
    for (let i = 1; i < 10; i++) {
      let response = await Axios(`https://swapi.dev/api/people/?page=${i}`);
      let cleanData = response.data.results.map(async character => {
        return {
          ...character,
          height: setSpec(character.height, 'cm'),
          mass: setSpec(character.mass, 'kg'),
          birth_year: setSpec(character.birth_year),
          gender: capitalize(character.gender),
          homeworld: await handleEndpoints(character.homeworld),
          species: setSpecies(await handleEndpoints(character.species)),
        };
      });

      Promise.all(cleanData).then(result =>
        setCharacters(characters => characters.concat(result))
      );
    }
  };

  const capitalize = (word) => {
    if (word === 'none') return 'n/a'
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  const handleEndpoints = async props => {
    let result = await Axios.get(`${props}`);
    return result.data.name;
  };

  const setSpecies = specie => {
    return specie ? specie : "Human";
  };

  const setSpec = (type, unit = '') => {
    return type === 'unknown' ? 'No Record' : `${type}${unit}`;
  }


  const columns = [
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'gender', text: 'Gender', sort: true },
    { dataField: 'species', text: 'Species', sort: true },
    { dataField: 'homeworld', text: 'Homeworld', sort: true },
    { dataField: 'birth_year', text: 'Birth Year', sort: true },
    { dataField: 'height', text: 'Height', sort: true },
    { dataField: 'mass', text: 'Mass', sort: true },
  ];

  const defaultSorted = [
    {
      dataField: 'name',
      order: 'asc',
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
