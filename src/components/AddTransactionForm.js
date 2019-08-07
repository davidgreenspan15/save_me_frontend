import React from 'react'

class AddTransactionForm extends React.Component{

  state = {
    kind: "",
    description: "",
    price: 0,
    frequency: "Once",
    category: "1",
    date: "",
    categories:[]

  }

  componentDidMount(){
    fetch("http://localhost:3000/categories")
    .then(resp => resp.json())
    .then(categories => {
      this.setState({
        categories: categories
      })
    })
  }

  renderCategoryOptions = () => this.state.categories.map(category => <option key={category.id} value= {category.id}>{category.name}</option>)


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = (event) => {
    this.setState({
      [event.target.name]: event.target.innerText

    })
  }

  renderFrequencyOptions = () => {
    const frequencyOptions = ["Once", "Weekly", "Monthly", "Yearly"]
    return frequencyOptions.map(frequency =>  <option key={frequency} value= {frequency}>{frequency}</option>)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/transactions",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        kind: this.state.kind,
        description: this.state.description,
        frequency: this.state.frequency,
        price: parseInt(this.state.price),
        category_id: this.state.category,
        user_id: localStorage.user_id,
        date: this.state.date
              })
    })
    .then(resp => resp.json())
    .then(response => console.log(response))
  }

  render(){
    return(
      <div>
      <form onSubmit={this.handleSubmit}className="" action="index.html" method="post">
        <button onClick={this.handleClick} type="button" name="kind">Expense</button>
        <button onClick={this.handleClick} type="button" name="kind">Income</button>
        <input onChange={this.handleChange} type="text" name="description" value={this.state.description} placeholder="Description"/>
        <input onChange={this.handleChange} type="number" name="price" value={this.state.price} placeholder="Price"/>
        <select onChange={this.handleChange} name="frequency">
          {this.renderFrequencyOptions()}
        </select>
        <select onChange={this.handleChange} name="category">
          {this.renderCategoryOptions()}
        </select>
        <input onChange={this.handleChange} type="date" name="date" value={this.state.date} placeholder="Description"/>
        <button type="Submit" name="button">Add Transaction</button>
      </form>
      </div>

    )
  }
}

export default AddTransactionForm
