import React from 'react';

import { Meteor } from 'meteor/meteor';
import { autobind } from 'core-decorators';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';

import Map from '../map/map.jsx';

import './shareWaste.less';

@autobind
class ShareWastePage extends React.Component {

  _map = null;

  getLocation() {
    Tracker.autorun(function() {
      const location = Geolocation.latLng();
      if (location) {
        this._map.data.setMapCenter(location);
      }
    }.bind(this));
  }

  render() {
    return (
      <div className="share-waste-page">
        <div className="background-map">
          <Map
            className="background-map"
            ref={(ref) => this._map = ref}
            showSearchBox
            />
            {/*<RaisedButton primary label="Get current location" className="getLocation" onTouchTap={this.getLocation} />*/}
        </div>
      </div>
    );
  }
}

export default createContainer(({ params }) => {
  return {
  };
}, ShareWastePage);
