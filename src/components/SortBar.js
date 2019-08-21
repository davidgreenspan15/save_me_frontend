import React from 'react'


class SortBar extends React.Component{

  state = {
    click: ""

  }

  handleClick = (event) => {
    this.setState({
      click: event.target.innerText
    },()=>{
      this.props.sortTransactions(this.state.click)
    })
  }


  render(){
    return(
      <ul className="collection">
      <div className="collection-item all-transaction-top-bar row">
      <p className="category col s1.5 " onClick={this.handleClick}>Date</p>
      <p className="category col s2" onClick={this.handleClick}>Type</p>
      <p className="category col s2" onClick={this.handleClick}>Description</p>
      <p className="category col s2" onClick={this.handleClick}>Category</p>
      <p className="category col s2" onClick={this.handleClick}>Price</p>
      <p className="category col s2" onClick={this.handleClick}>Created On</p>
      </div>
      </ul>
    )
  }
}
export default SortBar
