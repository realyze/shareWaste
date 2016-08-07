import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import { last } from 'lodash';

import './index.less';

const Step1 = (props) => {
  const user = props.currentUser;
  const parts = user.profile.name.split(/\s/);
  const firstName = parts[0];
  const lastName = last(parts);

  return (<div>
    <Paper zDepth={0}>
      <h1 className="header">Tell us a little bit about yourself!</h1>
      <TextField hintText="What's your first name?" defaultValue={firstName} underlineShow={false} />
      <Divider />
      <TextField hintText="What's your last name?" defaultValue={lastName} underlineShow={false} />
      <Divider />
      <Avatar src={user.profile.picture} />
    </Paper>
  </div>);
};

Step1.propTypes = {
  handleGoogleSignin: PropTypes.func,
  currentUser: PropTypes.object,
};

export default Step1;
