import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
  <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">Logo</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
        <li><Link to="/login" activeClassName="active">Login</Link></li>
      </ul>
    </div>
  </nav>
)