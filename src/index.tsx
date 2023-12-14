import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import './assets/styles/main.scss';

import './config/axios.config';

import { enableTabMode } from './utils/enableTabMode';

import { App } from './app';



const rootElement = document.getElementById('root') as HTMLElement;

ReactModal.setAppElement(rootElement);

ReactDOM.render(<App />, rootElement);

enableTabMode();
