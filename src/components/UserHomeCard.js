import React from 'react'

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
           <p className="user-details">Daily Spending:${this.props.dailySpending}</p>
           <p className="user-details">My Monthly Pace: ${this.props.monthlyPace} </p>
           <p className="user-details">My Monthly Savings: ${this.props.monthlySavings}</p>
         </div>
        </div>
       </div>
    )
  }
}



export default UserHomeCard
