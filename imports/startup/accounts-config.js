import { Accounts } from 'meteor/std:accounts-ui';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
  loginPath: '/signin',
  homeRoutePath: '/',
  profilePath: '/profile',
  resetPasswordPath: '/reset-password',
  onSignedInHook: () => console.log('signed in')
});