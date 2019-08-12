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
import BudgetContainer from './containers/BudgetContainer.js'





import {Route, Switch} from 'react-router-dom'




class App extends React.Component {
  state = {
    currentUser: null,
    transactions: [],
    loggedIn: false,
    categories:[],
    yearMonth: "",
    date:"",
    dailySpending:0,
    monthlyPace:0,
    day:0,
    monthlyPace:0,
    dataGrouped:{},
    dataObj:{},
    projectedYearlySavings:0
  }



  createColorData = () => {
  let colorObj = this.state.transactions.map(transaction => {
      if(transaction.kind === "Expense"){
        return transaction.category.color
      }
    })
    return Array.from(new Set(colorObj))
  }
  createPieData = () => {
    return this.state.transactions.reduce((accumulator,currentValue) => {
      if(currentValue.kind === "Expense"){
        if(accumulator[currentValue.category.name]){
          accumulator[currentValue.category.name] += (currentValue.price * -1)
        } else {
          accumulator[currentValue.category.name] = (currentValue.price * -1)
        }

      }
      return accumulator
    }, {})
  }

  renderCategoryKeys = () => {
    const labels = []

    for(const key in this.state.dataGrouped){
      labels.push(key)
    }

    return labels
  }

  renderTransactionData = () => {
    const categoryData = []
    for(const key in this.state.dataGrouped){
      categoryData.push(this.state.dataGrouped[key])
    }
    return categoryData
  }

  renderDataObject = () => {
    return({
    labels: this.renderCategoryKeys(),
    datasets: [{
      label: "Monthly Spending",
      data: this.renderTransactionData(),
      backgroundColor:this.createColorData()
    }]
  })
  }


  setDate = () => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day =date.getDate()
    if (month < 10){
      month = `0${month}`
    }
    if (day < 10){
      day =`0${day}`
    }
    let setDate = `${year}-${month}-${day}`
    let setYearMonth = `${year}-${month}`


    this.setState({
      yearMonth: setYearMonth,
      date: setDate,
      day: day,
      month: month
    })
  }

    dailySpending = () => {
    return  this.state.transactions.reduce((accumulator,currentValue) => {
        if(currentValue.date === this.state.date){
          return  accumulator + currentValue.price
        }

        return accumulator
      },0)
    }

    monthlyPace = () => {
      let total = 0
      let daysLeft = 30 - parseInt(this.state.day)
      this.setState({
        monthlyPace: daysLeft * parseInt(this.state.dailySpending)
      })
    }

    monthlySavings = () => {

      let total = 0
      this.state.transactions.forEach(transaction=>{
        let splitTransaction = transaction.date.split("-")
        let dateMonth = `${splitTransaction[0]}-${splitTransaction[1]}`
        if (dateMonth === this.state.yearMonth){
          total += transaction.price
        }
      }
    )
    return total
    }

    monthlyIncome = () => {
    let totalIncome = 0
      this.state.transactions.forEach(transaction=>{
        let splitTransaction = transaction.date.split("-")
        let dateMonth = `${splitTransaction[0]}-${splitTransaction[1]}`
        if (dateMonth === this.state.yearMonth){
          if(transaction.kind === "Income"){
            totalIncome += transaction.price
          }
        }
      }
    )
    return totalIncome
    }
    monthlyExpense = () => {
    let totalExpense = 0
      this.state.transactions.forEach(transaction=>{
        let splitTransaction = transaction.date.split("-")
        let dateMonth = `${splitTransaction[0]}-${splitTransaction[1]}`
        if (dateMonth === this.state.yearMonth){
          if(transaction.kind === "Expense"){
            totalExpense += transaction.price
          }
        }
      }
    )
    return totalExpense
    }

    projectedYearlySavings = () => {
      let monthsRemaining = 12 - parseInt(this.state.month)
      this.setState({
        projectedYearlySavings: monthsRemaining * this.state.monthlySavings
      })
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

    this.setDate()
    fetch("http://localhost:3000/transactions")
    .then(r => r.json())
    .then(transactions => {
  const myTransactions = transactions.filter(transaction => transaction.user.id === parseInt(localStorage.user_id));
      this.setState({
        transactions: myTransactions.sort(function(a,b){
          return new Date(b.date) - new Date(a.date)
        })
      },() => {
        this.setState({
          dailySpending:this.dailySpending(),
          monthlySavings: this.monthlySavings(),
          dataGrouped: this.createPieData()

        },()=>{
          this.monthlyPace()
          this.projectedYearlySavings()
          this.setState({
            dataObj: this.renderDataObject(),
            monthlyIncome:this.monthlyIncome(),
            monthlyExpense:this.monthlyExpense()

          })
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
      <div>
        <NavBar loggedIn={this.state.loggedIn} logout={this.logout}/>
        <Switch>
          <Route path="/signup" render={() => <SignupForm setCurrentUser={this.setCurrentUser}/>}/>
          <Route path="/login" render={() => <LoginForm setCurrentUser={this.setCurrentUser}/>}/>
            {
            this.state.currentUser
            ?
            <div>
              <Route path="/transactions" render={() => <TransactionsMainContainer editTransaction={this.editTransaction} deleteTransaction={this.deleteTransaction} transactions={this.state.transactions} categories={this.state.categories}/>}/>
              <Route path="/budget" render={() => <BudgetContainer dataObj={this.state.dataObj} monthlySavings={this.state.monthlySavings} monthlyIncome={this.state.monthlyIncome} monthlyExpense={this.state.monthlyExpense} projectedYearlySavings={this.state.projectedYearlySavings}/>}/>
              <Route path="/profile" render={() => <Profile  deleteUser={this.deleteUser} updateCurrentUser={this.updateCurrentUser} currentUser={this.state.currentUser}/>}/>
              <Route path="/addtransaction" render={() => <AddTransactionForm addtransaction={this.addtransaction} categories={this.state.categories}/>}/>
              <Route path="/home" render={()=> <HomePage monthlySavings={this.state.monthlySavings} dataObj={this.state.dataObj} monthlyPace={this.state.monthlyPace} dailySpending={this.state.dailySpending} deleteTransaction={this.deleteTransaction} categories={this.state.categories} transactions={this.state.transactions} editTransaction={this.editTransaction} currentUser={this.state.currentUser}/>}/>
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
