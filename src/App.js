'App.js'
import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from './components/SignupForm.js'
import NavBar from './components/NavBar.js'
import HomePage from './containers/HomePage.js'
import LoginForm from './components/LoginForm.js'
import AddTransactionForm from './components/AddTransactionForm.js'
import Profile from './components/Profile.js'
import TransactionsMainContainer from './containers/TransactionsMainContainer.js'
import BudgetChart from './components/chartPractice.js'




import {Route, Switch} from 'react-router-dom'




class App extends React.Component {
  state = {
    currentUser: null,
    transactions: [],
    loggedIn: false,
    categories:[]
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
      currentUser: user,
      loggedIn: true
    }, () => {
      localStorage.user_id = user.id
      this.props.history.push("/home")
    })
  }

  componentDidMount(){
    fetch("http://localhost:3000/transactions")
    .then(r => r.json())
    .then(transactions => {
  const myTransactions = transactions.filter(transaction => transaction.user.id === parseInt(localStorage.user_id));
      this.setState({
        transactions: myTransactions.sort(function(a,b){
          return new Date(b.date) - new Date(a.date)
        })
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
    fetch("http://localhost:3000/categories")
    .then(resp => resp.json())
    .then(categories => {
      this.setState({
        categories: categories
      })
    })
  }


  addtransaction = (newTransaction) =>{
    this.setState({
      transactions: [newTransaction, ...this.state.transactions]
    },() => {
      this.setState({
        transactions: this.state.transactions.sort(function(a,b){
          return new Date(b.date) - new Date(a.date)
        })
      },() => {
        this.props.history.push("/home")
      })
    })
  }

  editTransaction = (updatedTransaction)  => {
    this.setState({
      transactions: this.state.transactions.map(transaction => {
        if(transaction.id === updatedTransaction.id){
          return updatedTransaction
        }else{
          return transaction
        }
      })
    })
  }

  deleteUser = () => {
    this.setState({
      currentUser:null,
      loggedIn:false
    },() => {
      localStorage.removeItem("user_id")
      this.props.history.push("/signup")
    })
  }

  deleteTransaction = (transactionId) => {
    this.setState({
      transactions: this.state.transactions.filter(transaction => transaction.id !== transactionId)
    },() => {
      alert("Transaction Deleted")
    })
  }

  render(){
    return (
      <div>{
          this.state.transactions.length > 1?
          <BudgetChart transactions={this.state.transactions}/>
          :
          null
        }
        <NavBar loggedIn={this.state.loggedIn} logout={this.logout}/>
        <Switch>
          <Route path="/signup" render={() => <SignupForm setCurrentUser={this.setCurrentUser}/>}/>
          <Route path="/login" render={() => <LoginForm setCurrentUser={this.setCurrentUser}/>}/>
            {
            this.state.currentUser
            ?
            <div>
              <Route path="/transactions" render={() => <TransactionsMainContainer editTransaction={this.editTransaction} deleteTransaction={this.deleteTransaction} transactions={this.state.transactions} categories={this.state.categories}/>}/>
              <Route path="/profile" render={() => <Profile  deleteUser={this.deleteUser} updateCurrentUser={this.updateCurrentUser} currentUser={this.state.currentUser}/>}/>
              <Route path="/addtransaction" render={() => <AddTransactionForm addtransaction={this.addtransaction} categories={this.state.categories}/>}/>
              <Route path="/home" render={()=> <HomePage deleteTransaction={this.deleteTransaction} categories={this.state.categories} transactions={this.state.transactions} editTransaction={this.editTransaction} currentUser={this.state.currentUser}/>}/>
            </div>
            :
            null
          }
        </Switch>
      </div>
    );

  }
}

export default App;
