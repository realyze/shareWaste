import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Threads = new Mongo.Collection('threads');

const maxResults = 100000;

Meteor.methods({
  'threads.insert': ({ recipientId }) => {
    return Threads.insert({
      posts: [],
      participantIds: [Meteor.userId(), recipientId],
    });
  },

  'posts.insert': ({ content, threadId }) => {
    const thread = Threads.findOne({
      _id: threadId,
      participantIds: Meteor.userId(),
    });

    if (!thread) {
      throw new Meteor.Error('THREAD_NOT_FOUND', `Thread ${threadId} not found`);
    }

    Threads.update({ _id: threadId }, { $push: {posts: {
      senderId: Meteor.userId(),
      postedAt: new Date(),
      content,
    } } });
  },
});

if (Meteor.isServer) {
  Meteor.publish('threads', function ({ participiantId }) {
    console.log('subscribing to threads collection', this.userId);

    const threadCursor = Threads.find({
      participantIds: { $in: [this.userId, participiantId] },
    }, {
      limit: maxResults,
    });

    const userCursor = Meteor.users.find({ _id: participiantId }, {
      fields: { profile: 1 },
    });

    return [threadCursor, userCursor];
  });
}

export default Threads;