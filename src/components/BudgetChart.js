import React from 'react'
import {Bar,Line,Pie,Doughnut} from 'react-chartjs-2'
import {Link} from 'react-router-dom'

class BudgetChart extends React.Component{






  render(){
    return(
      <Link to="/budget"><div className="chart">
      <Doughnut
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
        }}
      />
  <p>Monthly Expenses</p>
      </div></Link>
    )
  }
}

export default BudgetChart
