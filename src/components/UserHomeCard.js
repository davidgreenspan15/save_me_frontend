import React from 'react'

class UserHomeCard extends React.Component{


  render(){
    return(
      <div>
        <h1>Welcome {this.props.currentUser.name}!</h1>
        <h1>Daily Spending:${this.props.dailySpending} <span></span></h1>
        <h1>My Monthly Pace: ${this.props.monthlyPace} <span></span></h1>
        <h1>My Monthly Savings: ${this.props.monthlySavings} <span></span></h1>
      </div>
    )
  }
}

export default UserHomeCard
