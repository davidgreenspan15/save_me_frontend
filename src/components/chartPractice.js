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

    renderTotal = () => {
      let d = new Date()
      let  day = d.getDate()
      let year = d.getYear()
      let month = d.getMonth()
    let total = this.props.transactions.reduce((accumulator,currentValue) => accumulator + currentValue.price,0)
    return [total,month]

    }

  render(){
      console.log(this.renderTotal())
    return(
      <div className="chart">
      <Doughnut
        data={this.renderDataObject()}
      />
    <p>Total: ${this.renderTotal()}</p>
      </div>
    )
  }
}
export default BudgetChart
