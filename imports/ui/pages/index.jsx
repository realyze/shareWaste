import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import SimpleMap from '../components/map.jsx';
import {WasteSpots} from '../../api/wasteSpots';

const mapContainerStyle = {
  height: '60%'
};

function renderMap(props) {
  if (props.initialLocation) {
    return <SimpleMap
      initialLocation={props.initialLocation}
      markers={props.wasteSpots}
      onMapClick={onMapClick}
      onMarkerClick={onMarkerClick}
      onMarkerRightclick={onMarkerRightclick} />
  } else {
    return <div>Retrieving current location...</div>
  }
}

const Main = (props) => (
  <div className="map-container" style={mapContainerStyle}>
    {renderMap(props)}
  </div>
);

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

export default createContainer(() => {
  Meteor.subscribe('wasteSpots');
  return {
    wasteSpots: WasteSpots.find({}).fetch(),
    initialLocation: Geolocation.latLng()
  };
}, Main);
