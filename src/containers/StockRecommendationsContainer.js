import React from 'react'
import Stock from'../components/Stock.js'
import StockMoreInfo from '../components/StockMoreInfo.js'



class StockRecommendationsContainer extends React.Component{

  state = {
    stocks: [],
    moreInfo: false
  }


    componentDidMount(){
      fetch("http://localhost:3000/stocks",{
        headers: {
          "Authorization": this.props.user.stock_level
        }
      })
      .then(resp => resp.json())
      .then(stocks => {
        // this.setState({
        //   stocks: stocks
        // })
        this.filterStocks(stocks)
      })


    }

    // componentDidUpdate(prevProps){
    //   if(prevProps.user.stock_level !== this.props.user.stock_level){
    //     console.log("after update")
    //   }
    // }



    filterStocks = (stocks) => {
      if(stocks[0].risk_level === 1){
        this.shuffleStocks(stocks)
      }else{
        let filteredStocks = stocks.filter(stock => stock.purchase_price <= this.props.monthlySavings)
        if(filteredStocks.length === 0){
          fetch("http://localhost:3000/stocks",{
            headers: {
              "Authorization": 1
            }
          })
          .then(resp => resp.json())
          .then(levelOneStocks => {
            // this.setState({
              //   stocks: stocks
              // })
              this.filterStocks(levelOneStocks)
            })
          }
          else{
            this.shuffleStocks(filteredStocks)
          }

      }
    }

    shuffleStocks = (stocks) => {
  let currentIndex = stocks.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = stocks[currentIndex];
    stocks[currentIndex] = stocks[randomIndex];
    stocks[randomIndex] = temporaryValue;
  }

  this.setState({
    stocks: stocks
  })
}



    renderStocks = () => {
      return this.state.stocks.slice(0,5).map(stock => <Stock key={stock.id}stock={stock} addOne={this.props.addOne}selectStock={this.selectedStock}/>)
      }

      selectedStock = (stockId) => {
        let selectedStock = this.state.stocks.find(stock => stock.id === stockId)
        this.setState({
          selectedStock:selectedStock
        },()=>{
          this.setState({
            moreInfo:true
          })
        })
      }

      noMoreInfo = () => {
        this.setState({
          moreInfo:false
        })
      }

  render(){
    return(
      <div>
      {(this.state.moreInfo)?
        <div className= "stock-moreinfo-container container'
">
        <StockMoreInfo selectedStock={this.state.selectedStock} noMoreInfo={this.noMoreInfo}/>
        </div>
        :
        <div className= "stockinfo-container container">
          <div className="stockinfo-top-bar row">
        <p className="stock-category ">Name</p>
        <p className="stock-category ">Symbol</p>
        <p className="stock-category  ">Purchase Price</p>
        <p className="stock-category  ">YTD%</p>
        <p className="stock-category "> 3-Year YTD%</p>
        </div >
        <div className="stock-container">
        {this.renderStocks()}
        </div>
        </div>
      }

      </div>

    )
  }



}

export default StockRecommendationsContainer
