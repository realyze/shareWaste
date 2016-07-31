import React from 'react';
import { STATES } from 'meteor/std:accounts-ui';

export default ({content}) => (
  <div>
    <Accounts.ui.LoginForm formState={ STATES.SIGN_IN } />
  </div>
);