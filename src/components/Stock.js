import React from 'react'


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
              alert(data.Note)
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
              alert(data.Note)
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

    fetchStockPrices = () => {

    }

  render(){
    return(
      <div onClick={()=>this.props.selectStock(this.props.stock.id)}>

        <p>{this.props.stock.name}|{this.props.stock.symbol}|{this.state.stockPrice}|{this.props.stock.ytd}%|{this.props.stock.three_ytd}%</p>
      </div>




    )
  }


}

export default Stock
