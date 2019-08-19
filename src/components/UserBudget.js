import React from 'react'

class UserBudget extends React.Component{

  // numberFormat = () => {
  //   new Intl.NumberFormat(`en-IN`, {
  //     style: 'currency',
  //     currency: 'USD'
  //   }).format(this.props.monthlySavings)
  // }

  render(){


    return(
      <div>
      <h1>Monthly Spending</h1>
      <h4>Income: {this.props.monthlyIncome}</h4>
      <h4>Expense: {this.props.monthlyExpense}</h4>
      <h4>Total Monthly Savings: {this.props.monthlySavings}</h4>
      <h4>Projected Yearly Savings: {this.props.projectedYearlySavings}</h4>
      </div>
    )
  }
}
export default UserBudget
