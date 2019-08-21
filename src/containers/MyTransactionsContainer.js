import React from 'react'
import Transaction from '../components/Transaction.js'


class MyTransactionsContainer extends React.Component{

  renderMyTransactions = () => {
    return this.props.transactions.map(transaction => <Transaction key={transaction.id} deleteTransaction={this.props.deleteTransaction} categories={this.props.categories} editTransaction={this.props.editTransaction} transaction={transaction}/>)
  }



  render(){

    return(
      <div className="all-transaction-container-container">
      <ul className="all-transactions-collection collection">
          {this.renderMyTransactions()}
      </ul>
    </div>
    )
  }
}

export default MyTransactionsContainer
