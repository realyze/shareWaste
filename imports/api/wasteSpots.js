import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const WasteSpots = new Mongo.Collection('wasteSpots');

Meteor.methods({
  'wasteSpots.insert'({title, position}) {
    return WasteSpots.insert({
      title, position
    });
  },

  'wasteSpots.remove'({_id}) {
    return WasteSpots.remove(_id);
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('wasteSpots', function wasteSpotsPublication() {
    return WasteSpots.find({});
  });
}