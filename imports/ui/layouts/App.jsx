import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Navigation } from '../components/navigation.jsx';


export default ( { children } ) => (
  <div>
    <Navigation />
    { children }
  </div>
)


/*
export default createContainer(() => {
  const loc = Geolocation.latLng() || { lat: -20, lng: 20 };
  return {
    wasteSpots: [{label: 'test', position: loc}],
    location: loc
  };
}, App);
*/