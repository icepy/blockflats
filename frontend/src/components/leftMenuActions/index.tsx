import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import addIcon from '../../assets/add.png';
import { LOGO_IMAGE } from '../../shared/constants';

interface IProps {
  html_url: string;
  avatar_url: string;
}

export default function LeftMenuActions(props: IProps) {
  const [hash, setHash] = React.useState("");
  React.useEffect(() => {
    const hashchangeHadnler = () => {
      setHash(location.hash);
    }
    setHash(location.hash);
    window.addEventListener('hashchange', hashchangeHadnler);
    return () => {
      window.removeEventListener('hashchange', hashchangeHadnler);
    }
  });
  const { html_url, avatar_url } = props;
  return (
    <div className="app-left-actions">
      <div className="avatar-container">
        <a href={html_url} target="_blank">
          <img src={avatar_url} />
        </a>
      </div>
      <div className="nav-container">
        <div className="app-nav">
          <NavLink to="/" className={ hash === '#/' ? 'app-nav-active' : ''}>
            集市
          </NavLink>
        </div>
        <div className="app-nav">
          <NavLink to="/pin" className={ hash === '#/pin' ? 'app-nav-active' : ''}>
            Pin
          </NavLink>
        </div>
      </div>
      <div className="app-add-card">
        <img src={addIcon} />
      </div>
      <div className="app-logo-container">
        <a href="https://weibo.com/p/1005052455876310/home" target="_blank">
          <img src={LOGO_IMAGE} />
        </a>
      </div>
    </div>
  )
}
