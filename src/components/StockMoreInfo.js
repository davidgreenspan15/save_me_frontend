import React from 'react'



class StockMoreInfo extends React.Component{

  render(){
    return(
      <div className="stock-moredetails-container container">
        <div className="stock-moredetails-row row">
    <p>Company:{this.props.selectedStock.name}</p>
    <p>Sector:{this.props.selectedStock.sector}</p>
    <p>Type:{this.props.selectedStock.category}</p>
    <p>description:{this.props.selectedStock.description}</p>
    <p>For more information from our friends at Fidelity please click <a href={this.props.selectedStock.stock_url}>here</a></p>
    <button onClick={this.props.noMoreInfo} className="submit" type="button" name="">Back</button>
    </div>
      </div>
    )
  }
}

export default StockMoreInfo
