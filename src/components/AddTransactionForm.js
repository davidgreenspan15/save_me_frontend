'AddTransactionForm.js'
import React from 'react'

class AddTransactionForm extends React.Component{

  state = {
    kind: "",
    description: "",
    price: "Price",
    frequency: "Once",
    category: "1",
    date: "",
    categories:[],
    incomeActive:"non-active",
    expenseActive:"non-active"

  }

  componentDidMount(){
      this.setState({
        categories: this.props.categories
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
    .then(response => {
      if(response.errors){
        alert(response.errors)
      }else{
    this.props.addtransaction(response)}
  })}

  active = (e) =>{
    if(e.target.innerText === "Expense"){
      this.setState({
        expenseActive: "expenseActive",
        incomeActive: "non-active"
      })
    }else if(e.target.innerText === "Income"){
      this.setState({
        incomeActive: "incomeActive",
        expenseActive: "non-active"
      })
    }
  }

  render(){
    return(
      <div className="add-transaction-container">
        <div className="add-transaction-form">
          <p class="login-welcome" align="center">Create Transaction!</p>
          <form onSubmit={this.handleSubmit} className="form-add-transaction" action="index.html" method="post">
            <button onClick={(e)=>{this.handleClick(e); this.active(e)}} className={this.state.expenseActive} type="button" name="kind">Expense</button>
            <button onClick={(e)=>{this.handleClick(e); this.active(e)}} className={this.state.incomeActive} type="button" name="kind">Income</button>
            <input onChange={this.handleChange} className="description" type="text" name="description" value={this.state.description} placeholder="Description"/>
            <input onChange={this.handleChange} className="amount" type="number" name="price" value={this.state.price} placeholder="Price"/>
            <select onChange={this.handleChange} className="dropdown-transaction" name="category">
              <option value="" disabled selected>Select a Category</option>
              {this.renderCategoryOptions()}
            </select>
            <input onChange={this.handleChange}className="date" type="date" name="date" value={this.state.date}/>
            <button className="submit" type="Submit" name="button">Add Transaction</button>
          </form>
        </div>
      </div>

    )
  }
}

export default AddTransactionForm
