import React from 'react'



class StockMoreInfo extends React.Component{

  render(){
    return(
      <div>
      {this.props.selectedStock.name}|{this.props.selectedStock.sector}|{this.props.selectedStock.category}|{this.props.selectedStock.description}|For more information from our friends at Fidelity please click <a href={this.props.selectedStock.stock_url}>here</a>
      <button onClick={this.props.noMoreInfo}type="button" name="">Back</button>
      </div>
    )
  }
}

export default StockMoreInfo
