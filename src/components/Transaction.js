import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
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
    color: "",
    incomeActive:"non-active",
    expenseActive:"non-active"
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
    },()=>{
      if (this.props.transaction.kind === "Expense"){
        this.setState({
          expenseActive: "expenseActive",
          incomeActive: "non-active"
        })
      }
      else if(this.props.transaction.kind === "Income"){
        this.setState({
          incomeActive: "incomeActive",
          expenseActive: "non-active"
        })
      }
    }
  )
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
      <div>
        {this.state.edit?
          <div className="add-transaction-form">
            <p class="add-transaction-welcome" align="center">Edit Transaction</p>
            <form onSubmit={this.handleSubmit}className="form-add-transaction" action="index.html" method="post">
              <button onClick={(e)=>{this.handleClick(e); this.active(e)}} className={this.state.expenseActive} type="button" name="kind">Expense</button>
              <button onClick={(e)=>{this.handleClick(e); this.active(e)}} className={this.state.incomeActive} type="button" name="kind">Income</button>
              <input onChange={this.handleChange} className="description" type="text" name="description" value={this.state.description} placeholder="Description"/>
              <input onChange={this.handleChange} className="amount" type="number" name="price" value={this.state.price} placeholder="Price"/>
              <select onChange={this.handleChange} className="dropdown-transaction" value={this.state.category} name="category">
                <option value="" disabled selected>Select a Category</option>
                {this.renderCategoryOptions()}
              </select>
              <input onChange={this.handleChange} className="date" type="date" name="date" value={this.state.date} placeholder="Description"/>
              <button onClick={this.toggleEdit} className="cancel" type="button" name="edit">Cancel</button>
              <button className="submit" type="Submit" name="button">Submit</button>
            </form>
          </div>
          :
          <div className="collection-item row">
            <span className="transaction-details col s1.5">{moment(this.props.transaction.date).format('MMMM Do YYYY')}</span>
              <span className="transaction-details col s1">{this.props.transaction.kind}</span>
              <span className="transaction-details col s2">{this.props.transaction.description}</span>
              <span className="transaction-details col s2">{this.props.transaction.category.name}</span>
              <span className="transaction-details col s2">{numeral(this.props.transaction.price).format('$0,0.00')}</span>
              <span className="transaction-details col s1.5">{moment(this.props.transaction.created_at).format('MMMM Do YYYY, h:mm a') }</span>
              <button className="edit-transaction " onClick={this.toggleEdit}  type="button" name="edit">✎</button>
              <button className="delete-transaction" onClick={this.deleteTransaction}type="button" name="delete">ｘ</button>
          </div>

        }
      </div>
    )
  }
}

export default Transaction
