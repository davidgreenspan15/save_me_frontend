import React from 'react'
import {Button, Container} from 'react-bootstrap'


class Profile extends React.Component{

  state = {
    edit: false,
    changePassword: false,
    name: this.props.currentUser.name,
    username:this.props.currentUser.username,
    stockLevel:this.props.currentUser.stock_level,
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
    passwordMatch: false

  }


  changeToTrue = (event) => {
    this.setState({

      [event.target.name]: true
    })
  }







  editUserProfile = (event) => {
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
  changePassword = (event) => {
    event.preventDefault()
    if(this.state.newPassword === ""){
      alert("Password Cannot Be Empty")
    }else{

      if(this.state.passwordMatch){
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}/password`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            old_password: this.state.currentPassword,
            new_password: this.state.newPassword
          })
        })
        .then(resp => resp.json())
        .then(updateUser => {
          if(updateUser.errors){
            alert(updateUser.errors)
          }else{
            this.props.updateCurrentUser(updateUser)
            this.setState({
              changePassword: false,
              currentPassword: "",
              newPassword: "",
              passwordConfirmation: ""
            })

          }
        })
      }else{
        alert("Passwords do not match!")
      }
    }

    }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    },()=> {
      if (this.state.newPassword === this.state.passwordConfirmation){
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

  changeToFalse = (event) => {
    this.setState({
      [event.target.name]: false
    })
  }

  deleteUser = () => {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`,{
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(resp => this.props.deleteUser())
  }


  render(){
    return(
      <div className="everything">
        <div className="maincontainer" >
        <div className="profile-container">
        { this.state.edit ?

          <div className="profile-form">
            <form onSubmit={this.editUserProfile} className="form-signup" action="index.html" method="post">
              <input onChange={this.handleChange} className="name" type="text" name="name" value={this.state.name}/>
              <input onChange={this.handleChange} className="un" type="text" name="username" value={this.state.username} />
              <input onChange={this.handleChange} className="dropdown-signup" type="text" name="stockLevel" value={this.state.stockLevel} />
              <button onClick={this.changeToFalse} className="cancel" type="button" name="edit">Cancel</button>
              <button className="submit" type="Submit" name="button">Submit</button>
            </form>
        </div>
          :
            <div className="profile-info">
              <div>

                <p className="profile-name"><span style={{fontSize: "20px", color: "#0E6C63"}}>Name:</span> {this.props.currentUser.name}</p>
                <p className="profile-username"><span style={{fontSize: "20px", color: "#0E6C63"}}>Username:</span> {this.props.currentUser.username}</p>
                <p className="profile-risk"> Stock Risk Level: <span style={{fontSize: "50px"}}>{this.props.currentUser.stock_level}</span></p>
              </div>


              <Button className="profile-submit" onClick={this.changeToTrue}type="button" name="edit">Edit Profile</Button>
              <Button className="profile-submit" onClick={this.changeToTrue}type="Button" name="changePassword">Change Password</Button>

              <Button className="delete" onClick={this.deleteUser}type="Button" name="delete">Delete Profile</Button>
            </div>


        }

        {
          this.state.changePassword ?
          <div className="profile-form">
          <form onSubmit={this.changePassword} className="form-signup" action="index.html" method="post">
            <input onChange={this.handleChange} className="pass" type="password" name="currentPassword" value={this.state.currentPassword} placeholder="Current Password"/>
            <input onChange={this.handleChange} className="pass" type="password" name="newPassword" value={this.state.newPassword} placeholder= "New Password"/>
            <input onChange={this.handleChange} className="pass" type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} placeholder="Password Confrimation"/>
            <button onClick={this.changeToFalse}className="cancel" type="button" name="changePassword">Cancel</button>
            <button className="submit" type="Submit" name="button">Submit</button>
          </form>
        </div>
          :
          null




        }

      </div>
      </div>

      </div>
    )
  }
}



export default Profile
