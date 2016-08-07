import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Navigation from '../components/navigation.jsx';

const App = ({ children, currentUser }) => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title={<span>Title</span>}
        // onTitleTouchTap={handleTouchTap}
        //iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        iconElementRight={<FlatButton label="Save" />}
        />
      {/*<Navigation currentUser={currentUser} />*/}
      { children  }
    </div>
  </MuiThemeProvider>
);

export default createContainer(() => ({
  currentUser: Meteor.user(),
})
, App);
