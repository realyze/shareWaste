import React, { PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import * as _ from 'lodash';
import { createContainer } from 'meteor/react-meteor-data';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { autobind } from 'core-decorators';
import moment from 'moment';

import './chat.less';

@autobind
export default class Chat extends React.Component {

  state = {
    postValue: '',
  };

  _post = null;

  postMessage() {
    const content = this._post.getValue();
    if (!content) {
      return;
    }
    this.props.onNewPost(content);
    this.setState({ postValue: '' });
  }

  handlePostChanged(event) {
    this.setState({ postValue: event.target.value });
  }

  render() {
    const { thread, participants } = this.props;
    return (
      <div className="chat-component">
        <section>
        {
          (!thread || _.isEmpty(thread.posts)) ?
            <div>No messages (yet!)</div>
            :
            <List>
            {
              _.map(thread.posts, (post, i) => {
                const sender = _.find(participants, p => p._id === post.senderId);
                const duration = moment.duration(moment().diff(moment(post.postedAt))).humanize();
                return (
                  <div key={i} className="chat-item">
                    <div className="heading">
                      <Avatar src={sender.profile.picture} />
                      <p className="sender-name">{sender.profile.firstName} {sender.profile.lastName} wrote {duration} ago</p>
                    </div>
                    <div className="content">
                      <p>{post.content}</p>
                    </div>
                  </div>
                );
              })
            }
            </List>
        }
        </section>
        <section>
          <div>
            <TextField
              id="new-message"
              hintText="Write your message..."
              fullWidth
              multiLine
              rows={1}
              rowsMax={5}
              ref={(ref) => this._post = ref}
              value={this.state.postValue}
              onChange={this.handlePostChanged}
              />
          </div>
          <div>
            <RaisedButton className="send-button" label="Send" primary onTouchTap={this.postMessage} />
          </div>
        </section>
      </div>
    );
  }
}

Chat.propTypes = {
  thread: PropTypes.object,
  onNewPost: PropTypes.func,
  participants: PropTypes.arrayOf(PropTypes.object),
};
