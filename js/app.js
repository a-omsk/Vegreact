import React from  'react';
import History from 'history';
import {render} from 'react-dom';
import {Redirect, Router, Route, Link, browserHistory } from 'react-router';
import Normalize from '../css/normalize.css';
import CityStore from './stores/CityStore';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import LocationDetails from './components/LocationDetails';

render((
  <Router history={browserHistory}>
    <Route component={Main}>
        <Route path="locations/:city" component={Sidebar}>
            <Route path=":id" component={LocationDetails}></Route>
        </Route>
        <Redirect from="/" to={`/locations/${CityStore.getCurrentCity()}`} />
    </Route>

  </Router>
), document.getElementById('react'))
