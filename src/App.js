import React from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import MainContainer from "./components/pages/main";
import LoginContainer from "./components/pages/login/LoginContainer";
import RegistrationContainer from "./components/pages/registration/RegistrationContainer";


class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className='container'>
          <div className="wrap app">
            <div className="row">
              <Switch>
                <Route path='/registration' render={() => <RegistrationContainer/>}/>
                <Route path='/login' render={() => <LoginContainer/>}/>
                <Route path='/' render={() => <MainContainer/>} />
              </Switch>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
