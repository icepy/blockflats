import React from 'react';
import './style.css';

interface IProps {
  text: string;
  open: boolean;
}

export default function Alert(props: IProps){
  const { text, open } = props;
  return (
    <>
      { open ?
        (
          <div className="alert-extends">
            <div className="alert-extends-content">
              { text }
            </div>
          </div>
        ) : null
      }
    </>
  )
}

