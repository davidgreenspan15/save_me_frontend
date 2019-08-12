import React from 'react'
import {Link} from 'react-router-dom'

class NavBar extends React.Component{

handleClick = () =>{
  this.props.logout()
}

  render(){
    return(
      <div>
      {this.props.loggedIn ?
        <div>
        <Link to="/home"><h1>$aveME</h1></Link>
        <Link to="/addtransaction"><p>Add Transaction</p></Link>
        <Link to="/transactions"><p>Transaction</p></Link>
        <Link to="/budget"><p>My Budget</p></Link>
        <Link to="/profile"><p>Profile</p></Link>
        <button onClick={this.handleClick} >Logout</button>
        </div>
        :
        <div>
        <h1>$aveME</h1>
        <Link to="/signup"> <button >Signup</button> </Link>
        <Link to="/login"> <button >Login</button> </Link>
        </div>
      }
      </div>
    )
  }
}

export default NavBar
