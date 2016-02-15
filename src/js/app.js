import React from 'react';
import ReactDOM from 'react-dom';
import {Route, DefaultRoute } from 'react-router';
import Router from 'react-router';

import Template from './pages/template.jsx';
import DashboardPage from './pages/dashboard/index.jsx';

var routes = (
  <Route name="app" path="/" handler={Template}>
    <Route name="search" path="/search/:q" handler={DashboardPage} />
    <DefaultRoute handler={DashboardPage} />
  </Route>
);

var mountNode = document.getElementById('application');

Router.run(routes, function (Handler, state) {
  var params = state.params;
  var path = state.path;

  ReactDOM.render(<Handler params={params} path={path} />, mountNode);
});
