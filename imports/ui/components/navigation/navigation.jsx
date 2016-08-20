import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Avatar from 'material-ui/Avatar';

import './navigation.less';

function triggerUserLogout() {
  Meteor.logout();
}

const Navigation = (props) => (
  <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">Share Waste!</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li className="nav-menu-item"><a>About</a></li>
        <li className="nav-menu-item"><a>FAQ</a></li>
        {props.currentUser ?
          <li><Link to="/" activeClassName="active" onClick={triggerUserLogout}>Log Out</Link></li>
          :
          <li><Link to="/login" activeClassName="active">Login</Link></li>
        }
      </ul>
    </div>
  </nav>
);

Navigation.propTypes = {
  currentUser: PropTypes.object,
};

export default Navigation;
