import React from 'react'
import FilterBar from '../components/FilterBar.js'
import SortBar from '../components/SortBar.js'
import MyTransactionsContainer from './MyTransactionsContainer.js'




class TransactionsMainContainer extends React.Component{

  state = {
    transactions: this.props.transactions
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.transactions !== this.props.transactions){
      this.setState({
        transactions: this.props.transactions
      })
    }
  }

  componentDidMount(){
    this.setState({
      transactions: this.props.transactions
    })
  }

  searchTransactions =(search) => {
    this.setState({
      transactions: this.props.transactions.filter(transaction => transaction.description.toLowerCase().includes(search.toLowerCase()))
    })
  }

  filterTransactionsByCategory = (categoryId) => {

    if(categoryId === "All"){
      this.setState({
        transactions: this.props.transactions
      })
    }else{
      this.setState({
        transactions: this.props.transactions.filter(transaction => transaction.category.id === parseInt(categoryId))
      })

    }
  }

  filterTransactionsByType = (type) => {
    if(type === "All"){

      this.setState({
        transactions: this.props.transactions
      })
    }else if(type ==="Expense"){

      this.setState({
        transactions: this.props.transactions.filter(transaction => transaction.kind === type)
      })}else {

          this.setState({
            transactions: this.props.transactions.filter(transaction => transaction.kind === type)
          })

      }
    }

  // componentDidUpdate(prevProps,prevState) {
  //   console.log("prevState",prevState.transactions)
  //   console.log("state",this.state.transactions)
  // }

  sortTransactions = (topic) =>{
    switch (topic) {
      case "Date":
      this.setState({
        transactions: this.props.transactions.sort(function(a,b){
          return new Date(b.date) - new Date(a.date)
        })

      })
        break;
      case "Created On":
      this.setState({
        transactions: this.props.transactions.sort(function(a,b){
          return new Date(b.created_at) - new Date(a.created_at)
        })

      })
        break;
        case "Description":
          this.setState({
         transactions: this.props.transactions.sort(function(a,b) {
           var x = a.description.toLowerCase();
           var y = b.description.toLowerCase();
           return x < y ? -1 : x > y ? 1 : 0;
       })
       })

        break;
        case "Type":
          this.setState({
         transactions: this.props.transactions.sort(function(a,b) {
           var x = a.kind.toLowerCase();
           var y = b.kind.toLowerCase();
           return x < y ? -1 : x > y ? 1 : 0;
       })
       })

        break;
        case "Category":
          this.setState({
         transactions: this.props.transactions.sort(function(a,b) {
           var x = a.category.name.toLowerCase();
           var y = b.category.name.toLowerCase();
           return x < y ? -1 : x > y ? 1 : 0;
       })
       })

        break;
        case "Price":
          this.setState({
            transactions: this.props.transactions.sort(function(a,b) {
              return a.price - b.price
          })
          })

        break;
      default:
        this.setState({
          transactions: this.props.transactions
        })

    }
  }

  render(){
    return(
      <div>
      <FilterBar categories={this.props.categories} searchTransactions={this.searchTransactions}  filterTransactionsByCategory={this.filterTransactionsByCategory} filterTransactionsByType={this.filterTransactionsByType}/>
      <SortBar sortTransactions={this.sortTransactions}/>
      <MyTransactionsContainer transactions={this.state.transactions} deleteTransaction={this.props.deleteTransaction} editTransaction={this.props.editTransaction} categories={this.props.categories} />
      </div>
    )
  }
}

export default TransactionsMainContainer
