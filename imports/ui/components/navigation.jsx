import React from 'react';
import { IndexLink, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

function triggerUserLogout() {
  Meteor.logout();
}

export const Navigation = (props) => (
  <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">Share Waste!</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {/*<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>*/}
        {props.currentUser ?
          <li><Link to="/" activeClassName="active" onClick={triggerUserLogout}>Log Out</Link></li>
          :
          <li><Link to="/login" activeClassName="active">Login</Link></li>
        }
      </ul>
    </div>
  </nav>
)