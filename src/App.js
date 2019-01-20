import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import MainPage from "./components/MainPage";
import { Route, Switch } from "react-router-dom";
import ModShowPage from "./components/ModShowPage";
import EditProfileForm from "./components/EditProfileForm";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
// import StatsDiv from './components/StatsDiv';          will delay this component for later

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserLoggedIn: true,
      current_mod: 0,
      currentUser: {
        id: "",
        fullName: "",
        password: "",
        modId: 0
      },
      mods: [],
      posts: [],
      users: []
    };

    this.updateHandler = this.updateHandler.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/mods")
      .then(resp => resp.json())
      .then(mods => this.setState({ mods }));
    fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(users => this.setState({ users }));
    fetch("http://localhost:3000/api/v1/posts")
      .then(resp => resp.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <div>
        <NavBar isUserLoggedIn={this.state.isUserLoggedIn} />

        <Switch>
          <Route path="/home" component={MainPage} />
          <Route
            path="/mod/:id"
            render={RouterProps => {
              console.log(RouterProps);
              return <ModShowPage mod_id={RouterProps.match.params.id} />;
            }}
          />
          <Route
            path="/editProfile"
            render={() => {
              return (
                <EditProfileForm
                  currentUser={this.state.currentUser}
                  updateHandler={this.updateHandler}
                  mods={this.state.mods}
                />
              );
            }}
          />
          <Route
            path="/login"
            render={() => {
              return <LoginForm isUserLoggedIn={this.state.isUserLoggedIn} />;
            }}
          />
          <Route
            path="/signUp"
            render={() => {
              return <SignUpForm />;
            }}
          />
        </Switch>

        {/* {<StatsDiv />} */}
      </div>
    );
  }

  updateHandler(currentUser) {
    this.setState({ currentUser });

    fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        full_name: currentUser.full_name,
        password: currentUser.password,
        mod_id: currentUser.mod_id
      })
    });
  }
}

export default App;
