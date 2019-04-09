import React, { Component } from 'react';
import './style.css';
import { LOGO_IMAGE } from '../../shared/constants';

export default function FullLoad(){
  return (
    <header className="full-screent-load-header">
      <img src={LOGO_IMAGE} className="full-screent-load-logo" alt="logo" />
    </header>
  )
}
