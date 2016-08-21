import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';

import Threads from '../../../api/threads.js';
import Chat from '../chat/chat.jsx';

import './chatDrawer.less';


@autobind
class ChatDrawer extends React.Component {

  state = {
    open: false,
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  onNewPost(postContent) {
    function insertPost(content, threadId) {
      Meteor.call('posts.insert', {
        content,
        threadId,
      });
    }

    if (!this.props.thread) {
      Meteor.call('threads.insert', {
        recipientId: this.props.compost.ownerId,
      }, (err, threadId) => {
        if (err) {
          console.error(err);
          return;
        }
        insertPost(postContent, threadId);
      });
    } else {
      insertPost(postContent, this.props.thread._id);
    }
  }

  render() {
    console.log('render drawer', this.props);
    if (!this.props.compost) {
      return null;
    }

    const { compost, thread, participants } = this.props;

    return (
      <div>
        <Drawer open={this.props.open} containerClassName="compost-chat-drawer">
          <section className="about">
            <div>{compost.address}</div>
          </section>
          <section className="thread">
            <Chat
              thread={thread}
              participants={participants}
              onNewPost={this.onNewPost}
              />
          </section>
        </Drawer>
      </div>
    );
  }
}

export default createContainer((params) => {
  const compost = params.compost;
  if (!compost) {
    return {};
  }

  Meteor.subscribe('threads', { participiantId: compost.ownerId });

  return {
    thread: Threads.findOne(),
    participants: Meteor.users.find({
      _id: { $in: [Meteor.userId(), compost.ownerId] },
    }).fetch(),
  };
}, ChatDrawer);


ChatDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  compost: PropTypes.object,
  thread: PropTypes.object,
  participants: PropTypes.arrayOf(PropTypes.object),
};
