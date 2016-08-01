import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

// route components
import App from '../ui/layouts/app.jsx';
import IndexPage from '../ui/pages/index.jsx';
import MapPage from '../ui/pages/map.jsx';
import ShareCompostPage from '../ui/pages/shareCompost/shareCompost.jsx';
import LoginPage from '../ui/pages/login.jsx';
import NotFoundPage from '../ui/pages/notFound.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage} />
      <Route path="map" component={MapPage} />
      <Route path="share-compost" component={ShareCompostPage} />
      <Route path="login" component={LoginPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Router>
);