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
      <div>
      <header className="recent-header">Recent Transactions</header>
      <div className="recent-container-container">
      <div className="recent-container">
        <ul className="collection" id="recent-categories">
        <div className="collection-item top-bar row">
          <span className="category col s2">Date</span>
          <span className="category col s1">Type</span>
          <span className="category col s2">Description</span>
          <span className="category col s2">Category</span>
          <span className="category col s2">Price</span>
          <span className="category col s2">Created On</span>
        </div>
        </ul>
        <ul className="collection">
        {this.renderRecentTransactions()}
        </ul>
      </div>
      <Link to="/transactions"><a class="submit center">All Transactions</a></Link>
      </div>
    </div>
    )
  }
}

export default RecentTransactionsContainer
