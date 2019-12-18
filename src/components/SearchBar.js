import React from 'react';

const SearchBar = (props) => {

  function handleOnChange (event){
    props.handleSort(event.target.value);
    props.toggleChecked()
  }

  return (
    <div>

      <strong>Sort All Stocks by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={!props.checked} onChange={handleOnChange}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.checked} onChange={handleOnChange}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(event) => props.filterStocks(event.target.value)}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
