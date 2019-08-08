import React from 'react'

class UserHomeCard extends React.Component{
  render(){
    return(
      <div>
        <h1>Welcome {this.props.currentUser.name}!</h1>
        <h1>My Daily Spending <span></span></h1>
        <h1>My Monthly Pace <span></span></h1>
        <h1>My Monthly Savings <span></span></h1>
      </div>
    )
  }
}

export default UserHomeCard
