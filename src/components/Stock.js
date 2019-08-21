import React from 'react'
import numeral from 'numeral'


class Stock extends React.Component{

  state = {
    stockPrice: 0
  }

  componentDidMount(){

    if(this.props.stock.category !== "Mutual Fund"){
      if(this.props.stock.symbol === "BRK/B"){
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=BRK-B&apikey=ZG13BP9LO8GL1L1Q`)
          .then(resp=>resp.json())
          .then(data => {

            if(data.Note){
              this.setState({
                stockPrice: this.props.stock.purchase_price
              })
            }else {
                this.props.addOne()
              this.setState({
                stockPrice: (data["Global Quote"]["05. price"])
              })
            }
          })
      }else{
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.props.stock.symbol}&apikey=ZG13BP9LO8GL1L1Q`)
          .then(resp=>resp.json())
          .then(data => {

            if(data.Note){
              this.setState({
                stockPrice: this.props.stock.purchase_price
              })
            }else {
              this.props.addOne()
              this.setState({
                stockPrice: (data["Global Quote"]["05. price"])
              })
            }
          })

      }

      }

    }


  render(){
    return(
      <div className="stock-details container" onClick={()=>this.props.selectStock(this.props.stock.id)}>
        <div className="row">

        <p className="col s3" >{this.props.stock.name}</p>
        <p className="col s2">{this.props.stock.symbol}</p>
        <p className="col s3">{numeral(this.state.stockPrice).format('$0,0.00')}</p>
        <p className="col s2">{numeral(this.props.stock.ytd/100).format('0.00%')}</p>
        <p className="col s2">{numeral(this.props.stock.three_ytd/100).format('0.00%')}</p>
        </div>
      </div>




    )
  }


}

export default Stock
