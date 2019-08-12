import React from 'react'
import {Bar,Line,Pie,Doughnut,HorizontalBar} from 'react-chartjs-2'


class BudgetLineChart extends React.Component{






  render(){
    return(
      <div className="chart">
      <HorizontalBar
        data={this.props.dataObj}/>
      </div>
    )
  }
}

export default BudgetLineChart
