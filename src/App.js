import React, { Component } from 'react';
import './App.css';
import NavBar from "./components/NavBar"
import MainPage from './components/MainPage';
import { Route, Switch } from "react-router-dom";
import ModShowPage from './components/ModShowPage';
import EditProfileForm from './components/EditProfileForm';
import LoginSignupForm from './components/LoginSignUpForm';
// import StatsDiv from './components/StatsDiv';          will delay this component for later

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isUserLoggedIn: false,
      currentUser: {
        full_name: "",
        password: "",
        mod_id: 0
      }
    }
  
    this.updateHandler = this.updateHandler.bind(this);

  }


  render() {
    return (
      <div >
        <NavBar isUserLoggedIn={this.state.isUserLoggedIn} />
        <Switch>

          <Route path="/home" component={MainPage} />
          <Route path ="/mod/:id" component={ModShowPage} />
          <Route path="/editProfile" render={()=>{
            return(
            <EditProfileForm currentUser={this.state.currentUser} updateHandler={this.updateHandler} />
            )}} />
          <Route path="/login" render={()=>{
            return (
            <LoginSignupForm isUserLoggedIn={this.state.isUserLoggedIn} />
            )}} />
          
          
        </Switch>
        
        
        {/* {<StatsDiv />} */}
      </div>
    );
  }

  updateHandler(currentUser){
    this.setState({ currentUser });

    fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`, {
      method: "PATCH", 
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({ full_name: currentUser.full_name, password: currentUser.password, mod_id: currentUser.mod_id })
    });
  }
}

export default App
