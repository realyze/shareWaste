/* global Tracker Geolocation Meteor */

import React from 'react';

import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { autobind } from 'core-decorators';
import { createContainer } from 'meteor/react-meteor-data';
// import RaisedButton from 'material-ui/RaisedButton';

import Map from '../map/map.jsx';
import ChatDrawer from '../../components/chatDrawer/chatDrawer.jsx';

import './shareWaste.less';

const selectedCompost = new ReactiveVar(null);

@autobind
class ShareWastePage extends React.Component {

  _map = null;

  state = {
    chatDrawerOpen: false,
  }

  onMarkerClick(compost) {
    this.setState({ selectedCompost: compost });
    selectedCompost.set(compost);
  }

  onMapClick() {
    this.setState({ selectedCompost: null });
    selectedCompost.set(null);
  }

  getLocation() {
    Tracker.autorun(function getLocationAutorun() {
      const location = Geolocation.latLng();
      if (location) {
        this._map.data.setMapCenter(location);
      }
    }.bind(this));
  }

  render() {
    return (
      <div className="share-waste-page">
        <ChatDrawer
          open={!!this.state.selectedCompost}
          compost={this.state.selectedCompost}
          />
        <section className="background-map">
          <Map
            className="background-map"
            ref={(ref) => this._map = ref}
            showSearchBox
            onMarkerClick={this.onMarkerClick}
            onMapClick={this.onMapClick}
            selectedCompostId={this.state.selectedCompost ? this.state.selectedCompost._id : null}
            />
            {
              /* <RaisedButton primary label="Get current location" className="getLocation"
                  onTouchTap={this.getLocation} /> */
            }
        </section>
        <section>
        </section>
      </div>
    );
  }
}

export default createContainer(({ params }) => {
  return {};
}, ShareWastePage);
