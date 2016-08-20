import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigation from '../components/navigation/navigation.jsx';

const App = ({ children, currentUser }) => (
  <MuiThemeProvider>
    <div>
      <Navigation currentUser={currentUser} />
      <div className="" style={{height: '100%', minHeight: '30rem'}}>
        { children }
      </div>
    </div>
  </MuiThemeProvider>
);

export default createContainer(() => ({
  currentUser: Meteor.user(),
})
, App);
