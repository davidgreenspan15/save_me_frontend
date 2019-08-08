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
    this.setState({
      type: event.target.value
    },()=> this.props.filterTransactionsByType(this.state.type))

  }

  render(){
    return(
      <div>
      <Link to="/addtransaction"><button type="button" name="button">✚</button></Link>
      <select onChange={this.handleFilterCategory} className="" name="category">
        <option value="All">All</option>
        {this.renderCategoryOptions()}
      </select>
      <select onChange={this.handleFilterType}className="" name="Type">
        <option value="All">All</option>
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>
      <input onChange={this.handleSearch} type="text" name="search" value={this.state.search}/>
      </div>
    )
  }
}

export default FilterBar
