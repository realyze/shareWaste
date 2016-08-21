import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

// route components
import App from '../../ui/layouts/app.jsx';
import IndexPage from '../../ui/pages/index/index.jsx';
import LoginPage from '../../ui/pages/login.jsx';
import NotFoundPage from '../../ui/pages/notFound.jsx';
import SignupPage from '../../ui/pages/signup/signup.jsx';
import DetailsPage from '../../ui/pages/signup/details.jsx';
import ShareWastePage from '../../ui/pages/shareWaste/shareWaste.jsx';
//import ShareCompostIndexPage from '../../ui/pages/shareCompost/index.jsx';

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage} />
      <Route path="share-compost">
        <Route path="signup" component={SignupPage} />
        <Route path="your-details" component={DetailsPage} />
      </Route>
      <Route path="share-waste" component={ShareWastePage} />
      <Route path="login" component={LoginPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Router>
);


export default renderRoutes;