import React from 'react'
import {Bar,Line,Pie,Doughnut} from 'react-chartjs-2'
import {Link} from 'react-router-dom'

class BudgetChart extends React.Component{






  render(){
    return(
      <div className="chart home-chart">
      <Doughnut
        data={this.props.dataObj}
        options={{
          legend:{
            display:true,
            position:"left"
          },


          tooltips:{
            callbacks:{
              label: function(tooltipItem, data){
                let label = data.datasets[0].data[tooltipItem.index];
                  label = "Total: -$" + label
                  return label
              }
            }
          }
        }}
      />
    <Link  to="/budget"><p className="home-chart-text">Monthly Expenses</p>
      </Link></div>
    )
  }
}

export default BudgetChart
