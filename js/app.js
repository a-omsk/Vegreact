import React from 'react';
import { render } from 'react-dom';
import { Redirect, Router, Route, browserHistory } from 'react-router';
import CityStore from './stores/CityStore';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import LocationDetails from './components/details/LocationDetails';
import 'babel-polyfill';
import store from 'store/configure-store';

// Styles:
import '../styles/normalize.css';
import '../styles/global.scss';

render((
  <Router history={browserHistory}>
    <Route component={Main}>
        <Route path="locations/:city" component={Sidebar}>
            <Route path=":id" component={LocationDetails} />
        </Route>
        <Redirect from="/" to={`/locations/${CityStore.currentCity}`} />
    </Route>

  </Router>
), document.querySelector('#react'));
