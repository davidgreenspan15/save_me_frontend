import React from 'react'
import UserBudget from '../components/UserBudget.js'
import BudgetPieChart from '../components/BudgetPieChart.js'
import BudgetLineChart from '../components/BudgetLineChart.js'
import StockRecommendationsContainer from './StockRecommendationsContainer.js'



class BudgetContainer extends React.Component{

  state = {
    pie: true

  }

  togglePie = () => {
    this.setState({
      pie: !this.state.pie
    })
  }
  render(){
    return(
      <div className="everything">
      <div className="maincontainer">
        <div className= "budget-info-container">
          <UserBudget monthlyIncome={this.props.monthlyIncome} monthlyExpense={this.props.monthlyExpense} monthlySavings={this.props.monthlySavings} projectedYearlySavings={this.props.projectedYearlySavings}/>
          <StockRecommendationsContainer monthlySavings={this.props.monthlySavings} addOne={this.props.addOne} user={this.props.user}/>
        </div>
          <div className="chart-section">
            <div  class="switch">
              <label>
                Off
                <input type="checkbox"/>
                <span  onClick={this.togglePie} class="lever"></span>
                On
              </label>
            </div>
            {this.state.pie?
            <div>
              <BudgetPieChart dataObj={this.props.dataObj}/>
            </div>
        :
        <div>
        <BudgetLineChart dataObj={this.props.dataObj}/>
        </div>}
        </div>
      </div>
      </div>

    )
  }
}

export default BudgetContainer
