import React from  'react';
import History from 'history';
import {render} from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Main from './components/Main';
import LocationDetails from './components/LocationDetails';
import Normalize from '../css/normalize.css';

render((
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
  </Router>
), document.getElementById('react'))
