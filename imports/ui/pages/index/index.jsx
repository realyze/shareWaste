import React from 'react';
import { Link } from 'react-router';

import './index.less';


const IndexPage = ({ props }) => (
  <div className="main-choice-container">
    <Link to="/map" className="main-choice-button">I have waste</Link>
    <Link to="share-compost/signup" className="main-choice-button">I have compost</Link>
  </div>
);

export default IndexPage;