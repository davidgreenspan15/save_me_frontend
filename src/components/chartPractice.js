import React from 'react'

import {Bar,Line,Pie,Doughnut} from 'react-chartjs-2'

class BudgetChart extends React.Component{

  state = {
    dataGrouped:{},

  }


componentDidMount(){

  this.setState({
    dataGrouped: this.createPieData(),

  }
  )
}
    createColorData = () => {
    let colorObj = this.props.transactions.map(transaction => {
        if(transaction.kind === "Expense"){
          return transaction.category.color
        }
      })
      return Array.from(new Set(colorObj))
    }
  createPieData = () => {
    return this.props.transactions.reduce((accumulator,currentValue) => {
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

  // const data = {
  //   labels:[],
  //   datasets:[{
  //     label: 'Amount Spent',
  //     data: []
  //   }]
  // }

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

  render(){

    return(
      <div className="chart">
      <Doughnut
        data={this.renderDataObject()}
      />
      </div>
    )
  }
}
export default BudgetChart
