import React from 'react'
import numeral from 'numeral'

class UserHomeCard extends React.Component{


  render(){
    return(
      // <div>
      //   <h1>Welcome {this.props.currentUser.name}!</h1>
      //   <h1>Daily Spending:${this.props.dailySpending} <span></span></h1>
      //   <h1>My Monthly Pace: ${this.props.monthlyPace} <span></span></h1>
      //   <h1>My Monthly Savings: ${this.props.monthlySavings} <span></span></h1>
      // </div>
      <div className="user-homecard-container">
        <div className="user-homecard">
         <header class="card-title">Welcome {this.props.currentUser.name}!</header>
         <div className="homecard-details">
           <p className="user-details">Daily Spending:{numeral(this.props.dailySpending).format('$0,0.00')}</p>
           <p className="user-details">My Monthly Pace: {numeral(this.props.monthlyPace).format('$0,0.00')} </p>
           <p className="user-details">My Monthly Savings: {numeral(this.props.monthlySavings).format('$0,0.00')}</p>
         </div>
        </div>
       </div>
    )
  }
}


export default UserHomeCard
