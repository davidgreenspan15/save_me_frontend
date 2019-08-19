import React from 'react'
import Transaction from '../components/Transaction.js'
import {Link} from 'react-router-dom'


class RecentTransactionsContainer extends React.Component{


    recentTransactions = () => {
      return this.props.transactions.slice(0,4)
    }

    renderRecentTransactions = () => {
      return this.recentTransactions().map(transaction => <li className="collection-item"><Transaction key={transaction.id} deleteTransaction={this.props.deleteTransaction} categories={this.props.categories} editTransaction={this.props.editTransaction} transaction={transaction}/></li>)
    }

  render(){
    return(
      <div className="recent-container">
        <h1>Recent Transactions</h1>
        <ul className="collection">
        {this.renderRecentTransactions()}
        </ul>
      <Link to="/transactions"><a class="waves-effect waves-light btn-small">All Transactions</a></Link>
      </div>
    )
  }
}

export default RecentTransactionsContainer
