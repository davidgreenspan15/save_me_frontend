import React from 'react'
import {Bar,Line,Pie,Doughnut,HorizontalBar} from 'react-chartjs-2'


class BudgetLineChart extends React.Component{






  render(){
    return(
      <div className="chart">
      <HorizontalBar
        data={this.props.dataObj}
        options={{


          tooltips:{
            callbacks:{
              label: function(tooltipItem, data){
                let label = data.datasets[0].data[tooltipItem.index];
                  label = "Total: -$" + label
                  return label
              }
            }
          }
        }}/>

      </div>
    )
  }
}

export default BudgetLineChart
