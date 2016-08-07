/* global google Geolocation */

import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { autobind } from 'core-decorators';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import Geosuggest from 'react-geosuggest';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import '../../../api/user';
import './details.less';


@withRouter
class DetailsPage extends React.Component {

  defaultLocation = new google.maps.LatLng({ lat: 100, lng: 100 });

  state = {
    accepts: '',
    rejects: '',
    address: null,
  };

  @autobind
  _handleFinished() {
    Meteor.call('user.updateDetails', {
      accepts: this.state.accepts,
      rejects: this.state.rejects,
      address: this.state.address,
    }, (err) => {
      if (err) console.error(err);
      this.props.router.push('/');
    });
  }

  @autobind
  _handleAcceptsChange(ev) {
    this.setState({ accepts: ev.target.value });
  }

  @autobind
  _handleRejectsChange(ev) {
    this.setState({ rejects: ev.target.value });
  }

  @autobind
  _handleAddressSelected(data) {
    this.setState({ address: {
      location: data.location,
      label: data.label,
    } });
  }

  render() {
    const user = this.props.user;

    if (!user) {
      return <div>Must be signed in</div>;
    }

    return (
      <div className="details-container">
        <h2>Hi {user.profile.firstName}!</h2>
        <h3>Let's add some info about your compost.</h3>
        <Divider />
        <div className="input-field address">
          <Geosuggest
            placeholder="What's your address?"
            ref={c => { this._inputAddress = c; }}
            location={this.props.location}
            onSuggestSelect={this._handleAddressSelected}
            radius={5}
            />
        </div>
        <Divider />
        <div className="details">
          <TextField
            hintText="What do you accept in your compost?"
            ref={c => { this._inputRejects = c; }}
            onChange={this._handleRejectsChange}
            fullWidth
            multiLine
            rows={1}
            rowsMax={6}
            name="accepts"
            />
          <br />
          <TextField
            hintText="What do you not accept in your compost?"
            ref={c => { this._inputAccepts = c; }}
            fullWidth
            multiLine
            onChange={this._handleAcceptsChange}
            rows={1}
            rowsMax={6}
            name="refuses"
            />
        </div>
        <RaisedButton
          onTouchTap={this._handleFinished}
          className="all-done button"
          label="All Done!"
          primary
          />
      </div>
    );
  }
}

DetailsPage.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  router: PropTypes.object,
};

export default createContainer(() => {
  const defaultLocation = { lat: 100, lng: 100 };
  return {
    user: Meteor.user(),
    location: new google.maps.LatLng(Geolocation.latLng() || defaultLocation),
  };
}, DetailsPage);