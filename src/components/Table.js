import React, { useState, useEffect, useContext } from 'react';
import { swapiContext } from '../context/Context';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import Axios from 'axios';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

export const SwapiTable = () => {
  const { characters, setCharacters } = useContext(swapiContext);

  const apiURL = `https://swapi.dev/api/`;

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await Axios(`${apiURL}people/`);
      setCharacters(response.data.results);
    };
    fetchCharacters();
  }, [apiURL, characters, setCharacters]);

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

  const columns = [
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'gender', text: 'Gender', sort: true },
    { dataField: 'height', text: 'Height', sort: true },
    { dataField: 'mass', text: 'Mass', sort: true },
    { dataField: 'birth_year', text: 'Birth Year', sort: true },
    // { dataField: 'homeworld', text: 'Homeworld' },
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
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
  });

  const { SearchBar, ClearSearchButton } = Search;

  return (
    <ToolkitProvider
      bootstrap4
      keyField='name'
      data={characters}
      columns={columns}
      hover='true'
      striped='true'
      search
      filter={filterFactory()}>
      {props => (
        <div>
          {/* <h6>Something</h6> */}
          <SearchBar {...props.searchProps} />
          {/* <ClearSearchButton {...props.searchProps} /> */}
          <hr />
          <BootstrapTable
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
