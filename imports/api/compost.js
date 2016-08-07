import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Composts = new Mongo.Collection('composts');

Meteor.methods({
  'composts.insert': ({ title, address }) => Composts.insert({
    title,
    address,
  }),

  'composts.remove': ({ _id }) => Composts.remove(_id),
});

if (Meteor.isServer) {
  Meteor.publish('composts', () => Composts.find({}));
}

export default Composts;