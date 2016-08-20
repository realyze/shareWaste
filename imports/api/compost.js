import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Composts = new Mongo.Collection('composts');

const maxResults = 256;

Meteor.methods({
  'composts.insert': ({ title, location, address }) => Composts.insert({
    title,
    location: {
      type: 'Point',
      coordinates: [location.lng, location.lat],
    },
    address,
  }),

  'composts.remove': ({ _id }) => Composts.remove(_id),
});

if (Meteor.isServer) {
  Meteor.publish('composts', ({ center, bounds }) => {
    console.log('subscribing to composts collection', center, bounds);
    const cursor = Composts.find({
      // Do both `$box` and `$geoNear` queries to get results within a box sorted by distance.
      // See http://stackoverflow.com/a/29039070/148450 .
      $and: [
        {
          location: {
            $geoWithin: {
              $box: [
                [bounds.west, bounds.south],
                [bounds.east, bounds.north],
              ],
            },
          },
        },
        {
          location: {
            $geoNear: {
              $geometry: {
                type: 'Point',
                coordinates: [center.lng, center.lat],
              },
              //$maxDistance: 100000,
            },
          },
        },
      ],
    }, {
      limit: maxResults,
    });
    return cursor;
  });
}

export default Composts;