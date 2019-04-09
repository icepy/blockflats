import React from 'react';
import { IStarInfo } from '../../services/constants';
import NOPinIcon from '../../assets/no_pin.png';
import YESPinIcon from '../../assets/yes_pin.png';
import './style.css';

interface IProps {
  star: IStarInfo;
  index: number;
  onPinChanged: (star: IStarInfo, index: number) => void;
}

export default function RepoItem(props: IProps){
  const { star, onPinChanged, index } = props;
  return (
    <a
      href={star.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="repo-star-list-item">
        <div className="repo-star-header">
          <div className="repo-star-logo">
            <img src={star.avatar_url} />
          </div>
          <div className="repo-star-name">
            {star.full_name}
          </div>
          <div className="repo-star-action">
            <div
              className="repo-star-action-icon"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onPinChanged(star, index);
              }}
            >
              <img src={star.flats_pined ? YESPinIcon : NOPinIcon } />
            </div>
          </div>
        </div>
        <div className="repo-description-container">
          {star.description}
        </div>
        <div className="repo-data-container">
          <div className="repo-data-box">
            <span>Language: </span>{star.language || 'None'}
          </div>
          <div className="repo-data-box">
            <span>Fork: </span>{star.forks_count}
          </div>
          <div className="repo-data-box">
            <span>Star: </span>{star.watchers_count}
          </div>
        </div>
      </div>
    </a>
  )
}
