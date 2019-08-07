import React from 'react'
import UserHomeCard from '../components/UserHomeCard.js'
import BudgetChart from '../components/BudgetChart.js'
import RecentTransactionsContainer from './RecentTransactionsContainer.js'




class HomePage extends React.Component{
  render(){
    return(
      <div>
      <UserHomeCard/>
      <BudgetChart/>
      <RecentTransactionsContainer/>
      </div>
    )
  }
}
export default HomePage
