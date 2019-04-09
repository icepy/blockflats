import React, { Component } from 'react';
import './style.css';
import searchIcon from '../../../../assets/search.png';
import debounce from "lodash/debounce";


interface IProps {
  onChanged: (searchKey: string) => void;
}

interface IState {
  inputValue: string;
}

export default class Search extends Component<IProps, IState> {
  public debounceChangeHandler: (value: string) => void;

  constructor(props: IProps){
    super(props);
    this.state = {
      inputValue: '',
    }
    this.debounceChangeHandler = debounce(this.inputChangeHadnler, 400);
  }

  public inputChangeHadnler = (value: string) => {
    this.props.onChanged(value);
  }

  public changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({
      inputValue: value,
    });
    this.debounceChangeHandler(value);
  }

  public keyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (13 === e.keyCode) {
      this.props.onChanged(this.state.inputValue);
    }
  }

  public render(){
    const { inputValue } = this.state;
    return (
      <div className="pin-search-container">
        <div className="pin-search-icon">
          <img src={searchIcon} />
        </div>
        <input
          type="text"
          className="pin-search-input"
          placeholder="搜索"
          value={inputValue}
          onChange={this.changeHandler}
          onKeyUp={this.keyUpHandler}
        />
      </div>
    )
  }
}
