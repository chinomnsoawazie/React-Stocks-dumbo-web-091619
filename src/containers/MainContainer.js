import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
import axios from 'axios'

class MainContainer extends Component {

  
    state = {
      allStocks: [],
      myPortfolio: [],
      checkedStatus: false,
      filteredStocks: []
    }

    componentDidMount() {
      axios.get(`http://localhost:3000/stocks`)
      .then(r => {
        let initialSort = r.data.sort((a,b) => a.name > b.name ? 1 : -1)
        console.log(r.data[0])
        this.setState({allStocks: initialSort})
      })
    }
    
    buyStock = (stock) => {
      if(!this.state.myPortfolio.includes(stock)){
        this.setState({myPortfolio: [...this.state.myPortfolio, stock]})
      }
    }

    sellStock = (stock) =>{
      if(this.state.myPortfolio.includes(stock)){
        let unsoldStocks = this.state.myPortfolio.filter(stockFromPortfolio => {
          return stockFromPortfolio.id !== stock.id
        })
        this.setState({myPortfolio: unsoldStocks})
      }
    }

    handleSort = (sortTerm) => {
      this.clearFiltered()
      if(sortTerm === 'Alphabetically'){
        let sortedArray = this.state.allStocks.sort((a,b) => a.name > b.name ? 1 : -1)
        this.setState({allStocks: sortedArray})
      }else if(sortTerm === 'Price'){
        let sortedArray = this.state.allStocks.sort((a,b) => a.price > b.price ? 1 : -1)
        this.setState({allStocks: sortedArray})
      }
    }

    toggleChecked = () => {
      this.setState({checkedStatus: !this.state.checkedStatus})
    }

    filterStocks = (filterTerm) => {
      // console.log(filterTerm)
      if(filterTerm === 'All'){
        this.setState({filteredStocks: this.state.allStocks})
      }else{
        let filteredStocks = this.state.allStocks.filter(stock => stock.type === filterTerm)
        this.setState({filteredStocks: filteredStocks})
      }
    }

    clearFiltered = () => {
      this.setState({filteredStocks: []})
    }
    
    whatToShow = () =>{
      if(this.state.filteredStocks.length > 0){
        return this.state.filteredStocks
      }else{
        return this.state.allStocks
      }
    }
    
    
    render() {
      console.log(this.state.filteredStocks)
    return (
      <div>
        <SearchBar handleSort={this.handleSort} toggleChecked={this.toggleChecked} checked={this.state.checkedStatus} filterStocks={this.filterStocks}/>

          <div className="row">
            <div className="col-8">

              <StockContainer allStocks={this.whatToShow()} buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer myStocks={this.state.myPortfolio} sellStock={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
