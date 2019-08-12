import React from 'react'
import UserBudget from '../components/UserBudget.js'
import BudgetPieChart from '../components/BudgetPieChart.js'
import BudgetLineChart from '../components/BudgetLineChart.js'


class BudgetContainer extends React.Component{
  render(){
    return(
      <div>
        <UserBudget monthlyIncome={this.props.monthlyIncome} monthlyExpense={this.props.monthlyExpense} monthlySavings={this.props.monthlySavings} projectedYearlySavings={this.props.projectedYearlySavings}/>
        <BudgetPieChart dataObj={this.props.dataObj}/>
        <BudgetLineChart dataObj={this.props.dataObj}/>
      </div>

    )
  }
}

export default BudgetContainer
