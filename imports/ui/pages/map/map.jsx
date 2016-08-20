/* global Geolocation */

import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import * as _ from 'lodash';

import SimpleMap from '../../components/map.jsx';
import Compost from '../../../api/compost';

const mapBounds = new ReactiveVar(null);

const defaultLocation = { lng: 151.2055, lat: -33.8615 };

const onMapClick = (ev) => {
  Meteor.call('composts.insert', {
    title: 'test',
    location: {
      lat: ev.latLng.lat(),
      lng: ev.latLng.lng(),
    },
    address: 'TODO',
  }, (err) => console.log(arguments, err));
};

const onMarkerRightclick = (marker) => {
  Meteor.call('composts.remove', { _id: marker._id });
};

const onMarkerClick = (marker) => {
  console.log('marker clicked', marker);
};

const onMapChanged = ({ center, bounds }) => {
  console.log('new center', center, bounds);
  mapBounds.set(bounds);
};

class Main extends React.Component {

  _map = null;

  renderMap(props) {
    return (<SimpleMap
      ref={(ref) => this._map = ref}
      initialLocation={defaultLocation}
      markers={props.composts}
      onMapClick={onMapClick}
      onMarkerClick={onMarkerClick}
      onMarkerRightclick={onMarkerRightclick}
      onMapChanged={onMapChanged}
      showSearchBox={this.props.showSearchBox}
      />);

    /*return (
      <div>
        <div>Retrieving current location...</div>
        <div className="progress">
          <div className="indeterminate" />
        </div>
      </div>
    );*/
  }

  render() {
    return (
      this.renderMap(this.props)
    );
  }

}

export default createContainer(params => {
  const bounds = mapBounds.get();
  let composts = [];

  if (bounds) {
    const center = bounds.getCenter().toJSON();
    Meteor.subscribe('composts', {
      center,
      bounds: bounds.toJSON(),
    });
    composts = Compost.find({}).fetch();
  }

  console.log('composts', composts);

  return {
    composts,
    setMapCenter: () => {
      console.log('map', this);
    },
  };
}, Main);
