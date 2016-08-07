/* global Geolocation */

import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import * as _ from 'lodash';

import SimpleMap from '../components/map.jsx';
import Compost from '../../api/compost';

const mapContainerStyle = {
  height: '60%',
};

const onMapClick = (ev) => {
  Meteor.call('wasteSpots.insert', {
    title: 'test',
    position: {
      lat: ev.latLng.lat(),
      lng: ev.latLng.lng()
    }
  }, function(err) { console.log(arguments) });
}

const onMarkerRightclick = (marker) => {
  Meteor.call('wasteSpots.remove', {_id: marker._id})
}

const onMarkerClick = (marker) => {
  console.log('marker clicked', marker);
}


class Main extends React.Component {


  renderMap(props) {
    if (props.initialLocation) {
      return (<SimpleMap
        initialLocation={props.initialLocation}
        markers={_.map(props.composts, c => ({
          _id: c._id,
          position: c.address.location,
        }))}
        onMapClick={onMapClick}
        onMarkerClick={onMarkerClick}
        onMarkerRightclick={onMarkerRightclick}
        />);
    }

    return <div>Retrieving current location...</div>;
  }

  render() {
    return (
      <div className="map-container" style={mapContainerStyle}>
        {this.renderMap(this.props)}
      </div>
    );
  }

}

export default createContainer(() => {
  Meteor.subscribe('composts');
  return {
    composts: Compost.find({}).fetch(),
    initialLocation: Geolocation.latLng(),
  };
}, Main);
