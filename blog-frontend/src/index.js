import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './styles/main.scss';
import * as socialAuth from './lib/socialAuth';
import * as serviceWorker from './serviceWorker';

window.socialAuth = socialAuth;

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
