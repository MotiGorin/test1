import React from 'react';
import ReactDOM from 'react-dom';
import './MainStyles.css';
import MainPage from './MainPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainPage />, document.getElementById('root'));
registerServiceWorker();