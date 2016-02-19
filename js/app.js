import React from  'react';
import {render} from 'react-dom';
import {Redirect, Router, Route, Link, browserHistory } from 'react-router';
import Normalize from '../styles/normalize.css';
import GlobalStyles from '../styles/global.scss';
import CityStore from './stores/CityStore';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import LocationDetails from './components/details/LocationDetails';

render((
  <Router history={browserHistory}>
    <Route component={Main}>
        <Route path="locations/:city" component={Sidebar}>
            <Route path=":id" component={LocationDetails} />
        </Route>
        <Redirect from="/" to={`/locations/${CityStore.getCurrentCity()}`} />
    </Route>

  </Router>
), document.getElementById('react'));
