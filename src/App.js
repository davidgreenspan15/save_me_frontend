import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from './components/SignupForm.js'
import NavBar from './components/NavBar.js'
import HomePage from './containers/HomePage.js'
import LoginForm from './components/LoginForm.js'
import AddTransactionForm from './components/AddTransactionForm.js'
import Profile from './components/Profile.js'



import {Route, Switch} from 'react-router-dom'




class App extends React.Component {
  state = {
    currentUser:null,
    transactions: [],
    loggedIn:false
  }

  logout = () => {
    this.props.history.push("/login")
    this.setState({
      currentUser: null,
      loggedIn: false
    },() => {
      localStorage.removeItem("user_id")
    })
  }

  updateCurrentUser = (updateUser) => {
    this.setState({
      currentUser:updateUser
    })
  }

  setCurrentUser = (user) => {
    this.setState({
      currentUser:user,
      loggedIn:true
    }, () => {
      localStorage.user_id = user.id
      this.props.history.push("/")
    })
  }

  componentDidMount(){
    fetch("http://localhost:3000/transactions")
    .then(r=>r.json())
    .then(transactions => {
  let myTransactions = transactions.filter(transaction => transaction.user.id === parseInt(localStorage.user_id))
      this.setState({
        transactions: myTransactions
      })
    })

    fetch("http://localhost:3000/auto_login",{
      headers:{
        "Authorization": localStorage.user_id
      }
    })
    .then(resp => resp.json())
    .then(user => {
      if (user.errors){
        alert(user.errors)
      }else{
        this.setState({
          currentUser: user,
          loggedIn:true
        })
      }
    })
  }
  render(){
    return (
      <div>
        <NavBar loggedIn={this.state.loggedIn} logout={this.logout}/>
        <Switch>{
            this.state.currentUser?
            <Route path="/profile" render={() => <Profile updateCurrentUser={this.updateCurrentUser} currentUser={this.state.currentUser}/>}/>:
            null
          }
          <Route path="/signup" render={() => <SignupForm setCurrentUser= {this.setCurrentUser}/>}/>
          <Route path="/login" render={() => <LoginForm setCurrentUser= {this.setCurrentUser}/>}/>
          <Route path="/addtransaction" render={() => <AddTransactionForm/>}/>
          <Route path="/" render={()=> <HomePage/>}/>
        </Switch>
      </div>
    );

  }
}

export default App;
