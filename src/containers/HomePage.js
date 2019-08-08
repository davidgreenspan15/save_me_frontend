import React from 'react'
import UserHomeCard from '../components/UserHomeCard.js'
import BudgetChart from '../components/BudgetChart.js'
import RecentTransactionsContainer from './RecentTransactionsContainer.js'




class HomePage extends React.Component{
  render(){
    return(
      <div>
      <UserHomeCard transactions={this.props.transactions} currentUser={this.props.currentUser}/>
      <BudgetChart/>
      <RecentTransactionsContainer editTransaction={this.props.editTransaction} deleteTransaction={this.props.deleteTransaction} transactions={this.props.transactions}/>
      </div>
    )
  }
}
export default HomePage
