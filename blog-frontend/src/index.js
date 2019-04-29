import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './styles/main.scss';
import socialAuth from './lib/socialAuth';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
