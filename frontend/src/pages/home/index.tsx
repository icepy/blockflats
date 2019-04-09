import React, { Component } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { IStoreState } from '../../global/constants';
import * as actions from './flow/actions';
import './style.css';
import { IHomeStoreState } from './flow/constants';
import { IStarInfo } from '../../services/constants';
import RepoItem from '../../components/repoItem';
import FullLoad from '../../components/fullLoad';
import MoreAction from '../../components/more';
import Alert from '../../components/alert';

interface IActionsProps {
  fetchStars: (page: number) => void;
  pin: (index: number, pined: boolean, star: any) => void;
  clean: () => void;
}

interface IProps extends RouteComponentProps<any>, IActionsProps {
  home: IHomeStoreState;
}

class HomePage extends Component<IProps> {

  public i: number;
  public once: boolean;

  constructor(props:IProps){
    super(props);
    this.i = 0;
    this.once = true;
  }

  componentDidMount(){
    this.againFetchStars();
  }

  componentWillUnmount(){
    // 可能要清除一些内存数据
    this.props.clean();
  }

  public againFetchStars = () => {
    const { no_data } = this.props.home;
    if (!no_data) {
      this.i = this.i + 1;
      this.props.fetchStars(this.i);
    }
  }

  public onPin = (star: IStarInfo, index: number) => {
    this.props.pin(index, true, star);
  }

  public renderStarList(){
    const home = this.props.home;
    const { stars } = home;
    return (
      <div className="home-star-container">
        {
          stars.map((star, i) => {
            return (
              <RepoItem
                key={star.id}
                star={ star }
                index={i}
                onPinChanged={this.onPin}
              />
            )
          })
        }
      </div>
    )
  }

  public renderStarsList(){
    const home = this.props.home;
    const { reload, no_data } = home;
    return (
      <div>
        <div className="home-more-container">
          {this.renderStarList()}
          <MoreAction
            reload={ reload }
            noData={no_data}
            onAgainChanged={this.againFetchStars}
          />
        </div>
      </div>
    )
  }

  public render(){
    const { home } = this.props;
    if (home.stars.length > 0) {
      if (this.once) {
        this.once = false;
      }
    }
    const { openModal } = home;
    return (
      <div className="home-container">
        {
          this.once ? <FullLoad/> : this.renderStarsList()
        }
        <Alert
          text="已经存在：请在Pin列表中操作此项"
          open={openModal}
        />
      </div>

    );
  }
}

const mapStateToProps = (state: IStoreState) => {
  const { home } = state;
  return {
    home
  }
}

export default connect(mapStateToProps, actions)(HomePage);
