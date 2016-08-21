import { Meteor } from 'meteor/meteor';

// API
import '../imports/api/compost';
import '../imports/api/user';
import '../imports/api/threads';

import '../imports/startup/server/accounts-config';

Meteor.startup(() => {
  // code to run on server at startup
});
