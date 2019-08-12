import React from 'react'
import {Bar,Line,Pie,Doughnut} from 'react-chartjs-2'
class BudgetChart extends React.Component{






  render(){
    return(
      <div className="chart">
      <Doughnut
        data={this.props.dataObj}
      /><p>Monthly Expenses</p>
      </div>
    )
  }
}

export default BudgetChart
