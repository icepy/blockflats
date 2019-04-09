import React from 'react';
import './style.css';
import { LOGO_IMAGE } from '../../shared/constants';

interface IProps {
  reload: boolean;
  noData: boolean;
  onAgainChanged: () => void;
}

const renderMoreButtonListBlockLoad = () => {
  return (
    <header className="more-button-list-block-header">
      <img src={LOGO_IMAGE} className="more-button-list-block-logo" alt="logo" />
    </header>
  )
}

export default function MoreAction(props: IProps){
  const { reload, noData, onAgainChanged } = props;
  return (
    <div className="more-button" onClick={onAgainChanged}>
      <div className="more-button-reload">
        { reload ? renderMoreButtonListBlockLoad() : null}
      </div>
      <div className="more-button-text">
        { noData ? '没有更多数据': '更多' }
      </div>
    </div>
  )
}
