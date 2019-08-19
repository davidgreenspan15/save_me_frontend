import React from 'react'
import moment from 'moment'

class Transaction extends React.Component{

  state = {
    edit: false,
    kind: this.props.transaction.kind,
    description: this.props.transaction.description,
    price: this.props.transaction.price,
    frequency:this.props.transaction.frequency,
    category: this.props.transaction.category.id,
    date: this.props.transaction.date,
    categories:[],
    color: ""
  }

    componentDidUpdate(prevProps,prevState){
      if(prevProps.transaction.kind !== this.props.transaction.kind){
        this.updateColor()
      }
    }

    updateColor = () => {
      if(this.props.transaction.kind === "Expense"){
        this.setState({
          color:"red"
        })
      }else if(this.props.transaction.kind === "Income"){
        this.setState({
          color:"green"
        })
      }
    }
    componentDidMount(){
      this.setState({
        categories:this.props.categories
      },() => {
        this.updateColor()
        }
      )}


  toggleEdit = (event) => {
    this.setState({
      [event.target.name]: !this.state.edit
    })
  }
  handleClick = (event) => {
    this.setState({
      [event.target.name]: event.target.innerText

    })
  }

  renderCategoryOptions = () => this.state.categories.map(category => <option key={category.id} value= {category.id}>{category.name}</option>)

  renderFrequencyOptions = () => {
    const frequencyOptions = ["Once", "Weekly", "Monthly", "Yearly"]
    return frequencyOptions.map(frequency =>  <option key={frequency} value= {frequency}>{frequency}</option>)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/transactions/${this.props.transaction.id}`,{
      method: "PATCH",
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
        this.setState({
          edit: false,
          kind: this.props.transaction.kind,
          description: this.props.transaction.description,
          price: this.props.transaction.price,
          frequency:this.props.transaction.frequency,
          category: this.props.transaction.category.id,
          date: this.props.transaction.date,
        })
    this.props.editTransaction(response)}
  })}


   deleteTransaction = () => {
     fetch(`http://localhost:3000/transactions/${this.props.transaction.id}`,{
       method:"DELETE"
     })
     .then(resp => resp.json())
     .then(transactionid => this.props.deleteTransaction(transactionid))
   }


  render(){
    return(
      <div>
        {this.state.edit?
          <div>
            <form onSubmit={this.handleSubmit}className="" action="index.html" method="post">
              <button onClick={this.handleClick} type="button" name="kind">Expense</button>
              <button onClick={this.handleClick} type="button" name="kind">Income</button>
              <input onChange={this.handleChange} type="text" name="description" value={this.state.description} placeholder="Description"/>
              <input onChange={this.handleChange} type="number" name="price" value={this.state.price} placeholder="Price"/>
              <select onChange={this.handleChange} value={this.state.frequency} name="frequency">
                {this.renderFrequencyOptions()}
              </select>
              <select onChange={this.handleChange} value={this.state.category} name="category">
                {this.renderCategoryOptions()}
              </select>
              <input onChange={this.handleChange} type="date" name="date" value={this.state.date} placeholder="Description"/>
              <button onClick={this.toggleEdit} type="button" name="edit">Cancel</button>
              <button type="Submit" name="button">Submit</button>
            </form>
          </div>
          :
          <div className="transaction">

            <p>{moment(this.props.transaction.date).format('MMMM Do YYYY')}  {this.props.transaction.kind}  {this.props.transaction.description}  {this.props.transaction.category.name}  <span className={this.state.color}>${this.props.transaction.price}</span>  {moment(this.props.transaction.created_at).format('MMMM Do YYYY, h:mm a') } <button onClick={this.toggleEdit}  type="button" name="edit">✎</button>   <button onClick={this.deleteTransaction} className="red" type="button" name="delete">ｘ</button></p>
          </div>

        }
      </div>
    )
  }
}

export default Transaction
