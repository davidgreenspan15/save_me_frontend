import React from 'react'
import UserHomeCard from '../components/UserHomeCard.js'
import BudgetChart from '../components/BudgetChart.js'
import RecentTransactionsContainer from './RecentTransactionsContainer.js'





class HomePage extends React.Component{
  render(){
    return(


      <div >
      <div className= "row-one">
          <UserHomeCard transactions={this.props.transactions} monthlySavings={this.props.monthlySavings} monthlyPace={this.props.monthlyPace} currentUser={this.props.currentUser} dailySpending={this.props.dailySpending}/>
          <BudgetChart dataObj={this.props.dataObj}/>
      </div>
      <div className="">
          <RecentTransactionsContainer editTransaction={this.props.editTransaction} categories={this.props.categories} deleteTransaction={this.props.deleteTransaction} transactions={this.props.transactions}/>
      </div>
    </div>

    )
  }
}
export default HomePage
