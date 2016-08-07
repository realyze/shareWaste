import { ServiceConfiguration } from 'meteor/service-configuration';
import { Accounts } from 'meteor/accounts-base';
import * as _ from 'lodash';

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      loginStyle: 'popup',
      secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
  }
);

Accounts.onCreateUser((options, user) => {
  if (user.services.google && options.profile) {
    options.profile.firstName = user.services.google.given_name;
    options.profile.lastName = user.services.google.family_name;
    options.profile.picture = user.services.google.picture;
    user.profile = options.profile;
  }

  return user;
});
