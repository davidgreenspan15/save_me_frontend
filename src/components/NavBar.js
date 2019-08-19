import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar,NavItem} from 'react-materialize'
// import Navbar from 'react-bootstrap/Navbar'

class NavBar extends React.Component{

handleClick = () =>{
  this.props.logout()
}

  render(){
    return(
      <div>
      {this.props.loggedIn ?
        <nav className="nav-wrapper">
          <Link to="/home" className='brand-logo'>$aveME</Link>
          <ul className="right hide-on-med-and-down" id='nav-mobile'>
            <li><Link to="/addtransaction">Add Transaction</Link></li>
            <li><Link to="/transactions">Transaction</Link></li>
            <li><Link to="/budget">My Budget</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/login" onClick={this.handleClick}>Logout</Link></li>
            <li>{this.props.stockRequestCount}</li>
            <button onClick={this.props.resetStockReqeustCount}>Reset</button>
          </ul>
        </nav>
        :
        <nav className="nav-wrapper">
        <Link to="/login" className='brand-logo'>$aveME</Link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><Link to="/signup">Signup </Link></li>
        <li><Link to="/login">Login</Link></li>
        </ul>
        </nav>
      }
    </div>

    // <nav>
    //   <div class="nav-wrapper">
    //     <a href="#" class="brand-logo">Logo</a>
    //     <ul id="nav-mobile" class="right hide-on-med-and-down">
    //       <li><a href="sass.html">Sass</a></li>
    //       <li><a href="badges.html">Components</a></li>
    //       <li><a href="collapsible.html">JavaScript</a></li>
    //     </ul>
    //   </div>
    // </nav>
  //   <Navbar brand={<a />} alignLinks="right">
  // <NavItem href="">
  // Getting started
  // </NavItem>
  // <NavItem href="components.html">
  // Components
  // </NavItem>
  // </Navbar>
    )
  }
}

export default NavBar
