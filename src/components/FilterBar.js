import React from 'react'
import {Link} from 'react-router-dom'

class FilterBar extends React.Component{

  state = {
    search: "",
    categoryId:"All",
    type: "All"
  }

  renderCategoryOptions = () => this.props.categories.map(category => <option key={category.id} value= {category.id}>{category.name}</option>)

  handleSearch=(event)=>{
    this.setState({
      search: event.target.value
    },()=> this.props.searchTransactions(this.state.search))

  }

  handleFilterCategory = (event)=> {
    this.setState({
      categoryId: event.target.value
    },()=> this.props.filterTransactionsByCategory(this.state.categoryId))
  }

  handleFilterType = (event) => {
    console.log('state before', this.state.type)
    this.setState({
      type: event.target.value
    },()=> {
      console.log('state after', this.state.type)
      this.props.filterTransactionsByType(this.state.type)
    })

  }

  render(){
    return(
      <div className="inline">
      <select onChange={this.handleFilterCategory} className="category-transaction-dropdown" name="category">
        <option value="" disabled selected>Filter By Category</option>
        <option value="All">All</option>
        {this.renderCategoryOptions()}
      </select>

      <select onChange={this.handleFilterType}className="type-transaction-dropdown" name="Type">
        <option value="" disabled selected>Filter By Income or Expense</option>
        <option value="All">All</option>
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>
      <span className="searchbar-text">Search:</span> <input onChange={this.handleSearch} className="searchbar" type="text" name="search" value={this.state.search}/>
      </div>
    )
  }
}

export default FilterBar
