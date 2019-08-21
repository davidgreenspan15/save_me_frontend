import React from 'react'
import numeral from 'numeral'

class UserBudget extends React.Component{

  // numberFormat = () => {
  //   new Intl.NumberFormat(`en-IN`, {
  //     style: 'currency',
  //     currency: 'USD'
  //   }).format(this.props.monthlySavings)
  // }

  render(){


    return(
      <div className="user-budgetcard">
      <header className="budget-title">Monthly Spending</header>
      <p className="budget-card-detail">Income: {numeral(this.props.monthlyIncome).format('$0,0.00')}</p>
      <p className="budget-card-detail">Expense: {numeral(this.props.monthlyExpense).format('$0,0.00')}</p>
      <p className="budget-card-detail">Total Monthly Savings: {numeral(this.props.monthlySavings).format('$0,0.00')}</p>
      <p className="budget-card-detail">Projected Yearly Savings: {numeral(this.props.projectedYearlySavings).format('$0,0.00')
}</p>
      </div>
    )
  }
}
export default UserBudget
