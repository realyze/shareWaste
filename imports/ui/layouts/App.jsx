import React, { Component } from 'react';
import { Navigation } from '../components/navigation.jsx';
import { createContainer } from 'meteor/react-meteor-data';

const App = ({ children, currentUser }) => (
  <div>
    <Navigation currentUser={currentUser} />
    { children }
  </div>
)

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, App);