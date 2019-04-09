import React, { Component } from 'react';
import githubIcon from '../../assets/github.png';
import { LOGO_IMAGE } from "../../shared/constants";
import './style.css';

export default class SigninPage extends Component{

  public login = () => {
    location.href = '/login';
  }

  public render(){
    return (
      <div className="signin-container">
        <div className="signin-box">
          <div className="signin-header">
            <h4>Sign in to BlockFlats</h4>
            <div className="signin-logo-container">
              <img src={LOGO_IMAGE} />
            </div>
          </div>
          <div className="signin-content">
            <div className="signin-github-container" onClick={this.login}>
              <div className="signin-github-logo">
                <img src={githubIcon} />
              </div>
              <div>
                Github
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
