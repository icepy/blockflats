import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { AxiosResponse } from 'axios';
import SigninPage from './pages/signin';
import HomePage from './pages/home';
import TagPage from './pages/tag';
import PinPage from './pages/pin';
import LeftMenuActions from './components/leftMenuActions';
import * as services from './services';
import { IServiceResponse, IUserInfo } from './services/constants';
import { OK, LOGO_IMAGE } from './shared/constants';
import './App.css';

interface IState{
  signinStatusCode: number;
  userInfo: IUserInfo;
}

class App extends Component<{},IState> {
  constructor(props: {}){
    super(props);
    this.state = {
      signinStatusCode: 0,
      userInfo: {
        avatar_url: '',
        access_token: '',
        login: '',
        html_url: '',
      },
    }
  }

  public componentDidMount(){
    services.signin().then((response: AxiosResponse<IServiceResponse<IUserInfo>>) => {
      const axiosData = response.data;
      if (axiosData.statusCode === OK) {
        const data = axiosData.data;
        this.setState({
          userInfo: {
            html_url: data.html_url,
            login: data.login,
            access_token: data.access_token,
            avatar_url: data.avatar_url,
          },
          signinStatusCode: 2
        })
      } else {
        this.setState({
          signinStatusCode: 1,
        });
      }
    }).catch(() => {
      this.setState({
        signinStatusCode: 1,
      });
    });
  }

  private renderMain(){
    const { signinStatusCode, userInfo } = this.state;
    switch(signinStatusCode) {
      case 1:
        return (
          <SigninPage />
        );
      case 2:
        return (
          <Router>
            <div className="app-container">
              <LeftMenuActions
                html_url={userInfo.html_url}
                avatar_url={userInfo.avatar_url}
              />
              <div className="app-line-color"></div>
              <div className="app-boards">
                <div className="app-card">
                  <Route exact path="/" component={HomePage} />
                  <Route path="/pin" component={PinPage} />
                  <Route path="/tag" component={TagPage} />
                </div>
              </div>
            </div>
          </Router>
        );
      default:
        return (
          <header className="App-header">
            <img src={LOGO_IMAGE} className="App-logo" alt="logo" />
          </header>
        );
    }
  }

  public render() {
    return (
      <div className="App">
        {
          this.renderMain()
        }
      </div>
    );
  }
}

export default App;
