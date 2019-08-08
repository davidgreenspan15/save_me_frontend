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
      <div>
      <p onClick={this.handleClick}> Date</p>
      <p onClick={this.handleClick}>Type</p>
      <p onClick={this.handleClick}>Description</p>
      <p onClick={this.handleClick}>Category</p>
      <p onClick={this.handleClick}>Price</p>
      <p onClick={this.handleClick}>Created On</p>
      </div>
    )
  }
}
export default SortBar
