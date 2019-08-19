import React from 'react'

class LoginForm extends React.Component{
  state = {
    username: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/login",{
      method: "POST",
      headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
              })
    })
    .then(resp => resp.json())
    .then(response => {
      if(response.errors){
        alert(response.errors)
      } else {
        this.props.setCurrentUser(response)
      }
    })
  }

  render(){
    return(
      <div className="login-container">
        <div className="login-form">
          <p class="login-welcome" align="center">Welcome Back!</p>
          <form onSubmit={this.handleSubmit} className="form-login" action="index.html" method="post">
            <input onChange={this.handleChange} className="un" type="text" name="username" placeholder="Username" value={this.state.username}/>
            <input onChange={this.handleChange} className="pass" type="password" name="password" value={this.state.password} placeholder="Password"/>
            <button type="Submit" className="submit" name="button">Login</button>
          </form>
        </div>
      </div>

      )
  }

}

export default LoginForm
