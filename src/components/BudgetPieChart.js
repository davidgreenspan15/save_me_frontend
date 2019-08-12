import React from 'react'
import {Bar,Line,Pie,Doughnut,HorizontalBar} from 'react-chartjs-2'


class BudgetPieChart extends React.Component{






  render(){
    return(
      <div className="chart">
      <Pie
        data={this.props.dataObj}/>
      </div>
    )
  }
}

export default BudgetPieChart
