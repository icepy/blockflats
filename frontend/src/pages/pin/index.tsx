import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from "react-router-dom";
import './style.css';
import { IStoreState } from '../../global/constants';
import * as actions from './flow/actions';
import { IPinStoreState } from './flow/constants';
import FullLoad from '../../components/fullLoad';
import RepoItem from '../../components/repoItem';
import MoreAction from '../../components/more';
import Search from './component/search';
import Alert from '../../components/alert';
import OneNoData from '../../components/nodata';
import { IStarInfo } from '../../services/constants';


interface IActionsProps{
  fetchPins: (page: number) => void;
  pinAction: (index: number, star: IStarInfo) => void;
  searchPin: (searchKey: string) => void;
  clean: () => void;
}

interface IProps extends RouteComponentProps<any>, IActionsProps {
  pin: IPinStoreState;
}

class PinPage extends Component<IProps> {

  public i: number;

  constructor(props: IProps){
    super(props);
    this.i = 0;
  }

  componentDidMount(){
    this.againFetchStars();
  }

  componentWillUnmount(){
    this.props.clean();
  }

  public againFetchStars = () => {
    const { noData } = this.props.pin;
    if (!noData) {
      this.i = this.i + 1;
      this.props.fetchPins(this.i);
    }
  }

  public onPin = (star: IStarInfo, index: number) => {
    this.props.pinAction(index, star);
  }

  public renderPins(){
    const pin = this.props.pin;
    const { pinStars } = pin;
    return (
      <div className="pin-star-container">
        {
          pinStars.map((pinStar, i) => {
            return (
              <RepoItem
                key={pinStar.id}
                star={ pinStar }
                index={i}
                onPinChanged={this.onPin}
              />
            )
          })
        }
      </div>
    )
  }

  public renderPinStarList(){
    const { pin } = this.props;
    const { reload, noData, onUpsearch } = pin;
    return (
      <div className="pin-stars-parent-container">
        <div className="pin-stars-container">
          <Search
            onChanged={(value: string) => {
              if (!value){
                this.i = 1;
                this.props.clean();
                this.props.fetchPins(this.i);
              } else {
                this.props.searchPin(value);
              }
            }}
          />
          {this.renderPins()}
          { onUpsearch ? (null) : <MoreAction
            reload={reload}
            noData={noData}
            onAgainChanged={this.againFetchStars} />
          }
        </div>
      </div>
    )
  }

  public renderWhich(){
    const { pin } = this.props;
    const { whichStatus } = pin;
    switch(whichStatus) {
      case 1: {
        return this.renderPinStarList()
      }
      case 2: {
        return (
          <OneNoData text="没有更多 Pin 的数据"/>
        );
      }
      default: {
        return (
          <FullLoad/>
        );
      }
    }
  }

  public render(){
    const { pin } = this.props;
    const { openModal, openText } = pin;
    return (
      <div className="pin-container">
        {
          this.renderWhich()
        }
        <Alert
          open={openModal}
          text={openText}
        />
      </div>
    );
  }
}


const mapStateToProps = (state: IStoreState) => {
  const { pin } = state;
  return {
    pin
  }
}

export default connect(mapStateToProps, actions)(PinPage);
