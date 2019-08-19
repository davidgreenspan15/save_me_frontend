import React from 'react'

class SignupForm extends React.Component{

  state = {
    name: "",
    username: "",
    stockLevel: 1,
    password:"",
    passwordConfirmation:"",
    passwordMatch: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    },()=> {
      if (this.state.password === this.state.passwordConfirmation){
        this.setState({
          passwordMatch: true
        })
      }else{
        this.setState({
          passwordMatch:false
        })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.password ===""){
      alert("Password Cannot Be Empty")
    }else{
      if(this.state.passwordMatch){
        fetch("http://localhost:3000/users",{
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            "Accepts": 'application/json'
          },
          body: JSON.stringify({
            name: this.state.name,
            username: this.state.username,
            stock_level: parseInt(this.state.stockLevel),
            password: this.state.password
          })
        })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.errors){
            alert(resp.errors)
          }
          else {
            this.props.setCurrentUser(resp);
          }})

        }else{
          alert("Passwords don't match")
        }

    }
  }

  passwordMatch = () => {
    if (!this.state.passwordMatch){
      alert("Passwords don't match")
    }
  }

  render(){
    return(
      <div className="signup-container">
        <div className="signup-form">
        <p class="signup-welcome" align="center">Create a SaveME account</p>
        <p class="signup-intro" align="center"> One account to save and invest!</p>
          <form onSubmit={this.handleSubmit} className="form-signup" action="index.html" method="post">
            <input onChange={this.handleChange} className="name" type="text" name="name" value={this.state.name} placeholder="Name"/>
            <input onChange={this.handleChange} className="un" type="text" name="username" placeholder="Username" value={this.state.username}/>
            <select class="dropdown-signup" onChange={this.handleChange} name="stockLevel">
              <option value="" disabled selected>Choose a Risk Level</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <input onChange={this.handleChange} className="pass" type="password" name="password" value={this.state.password} placeholder="Password"/>
            <input onChange={this.handleChange} className="pass-confirmation" onBlur={this.passwordMatch} type="password" name="passwordConfirmation" placeholder="Confirm Password" value={this.state.passwordConfirmation}/>
            <button className="submit" type="Submit" name="button">Signup</button>
          </form>
        </div>
      </div>
    )
  }






}

export default SignupForm
