import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import './index.less';

const Step0 = (props) => (
  <div>
    <h1 className="header">Sign in</h1>
    <span className="label">Sign in with:</span>
    <RaisedButton label="Google" onTouchTap={props.handleGoogleSignin} />
    <RaisedButton label="Facebook" />
  </div>
);

Step0.propTypes = {
  handleGoogleSignin: PropTypes.func,
};

export default Step0;
