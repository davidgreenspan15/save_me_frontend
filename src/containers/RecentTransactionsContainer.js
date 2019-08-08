import React from 'react'
import Transaction from '../components/Transaction.js'


class RecentTransactionsContainer extends React.Component{


    recentTransactions = () => {
      return this.props.transactions.slice(0,4)
    }

    renderRecentTransactions = () => {
      return this.recentTransactions().map(transaction => <Transaction key={transaction.id} deleteTransaction={this.props.deleteTransaction} editTransaction={this.props.editTransaction} transaction={transaction}/>)
    }

  render(){
    console.log("RT", this.props)
    return(
      <div>
        {this.renderRecentTransactions()}
      </div>
    )
  }
}

export default RecentTransactionsContainer
