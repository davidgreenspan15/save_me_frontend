import React from 'react'



class Profile extends React.Component{

  state = {
    edit: false,
    changePassword: false,
    name: this.props.currentUser.name,
    username:this.props.currentUser.username,
    stockLevel:this.props.currentUser.stock_level

  }


  toggleClick = (event) => {
    this.setState({

      [event.target.name]: true
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`,{
      method: "PATCH",
      headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        stock_level: parseInt(this.state.stockLevel)
              })
    })
    .then(resp => resp.json())
    .then(updateUser => {
      this.props.updateCurrentUser(updateUser)
      this.setState({
        edit: false
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return(
      <div>
      { this.state.edit ?
        <form onSubmit={this.handleSubmit} className="" action="index.html" method="post">
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name}/>
          <input onChange={this.handleChange} type="text" name="username" value={this.state.username} />
          <input onChange={this.handleChange} type="text" name="stockLevel" value={this.state.stockLevel} />
          <button type="Submit" name="button">Submit</button>
        </form>
        :
        <div>
        <h1>Name:{this.props.currentUser.name}</h1>
        <h1>Username:{this.props.currentUser.username}</h1>
        <h1>Stock Risk Level:{this.props.currentUser.stock_level}</h1>
        <button onClick={this.toggleClick}type="button" name="edit">Edit Profile</button>
        <button onClick={this.toggleClick}type="button" name="changePassword">Change Password</button>
        </div>

      }
      </div>

    )
  }
}

export default Profile
