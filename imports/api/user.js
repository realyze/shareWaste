import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import Compost from './compost';

Meteor.methods({

  'user.updateDetails': ({ accepts, rejects, address }) => {
    check(Meteor.userId(), String);

    Meteor.users.update({ _id: Meteor.userId() }, { $set: {
      'profile.details.accepts': accepts,
      'profile.details.rejects': rejects,
      'profile.details.address': address,
    } });

    Meteor.call('composts.insert', {
      title: 'test title',
      address,
    }, (err) => {
      console.log('compost insert done', err);
    });
  },

});