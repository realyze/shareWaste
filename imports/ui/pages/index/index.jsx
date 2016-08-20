import React from 'react';
import Geosuggest from 'react-geosuggest';
import { autobind } from 'core-decorators';
import { createContainer } from 'meteor/react-meteor-data';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router'

import Map from './../map/map.jsx';

import './index.less';

@withRouter
@autobind
class IndexPage extends React.Component {

  state = {
    showAddressDialog: false,
  }

  _handleLeftBtnTap() {
    this.props.router.push('/share-waste');
  }

  /*renderAddressDialog() {
    return (<Paper className="address-box">
      <div>Awesome! Let's find a compost near you.</div>
      <Geosuggest
        className="address-suggest"
        placeholder="Enter your location"
        onSuggestSelect={this._handleAddressSelected}
        />
      <RaisedButton label="Back" />
      <RaisedButton label="Back" />
    </Paper>);
  }*/

  render() {
    return (
      <div className="index-page">
        <div className="background-map">
          <Map
            markers={this.props.composts}
            style={{ height: '20rem' }}
            />
        </div>

        <div className="row main-choice-container">
          <div>
          <div className="col s6 choice">
            <div>
              <h2>I have</h2>
              <h1>waste</h1>
              <a
                onTouchTap={this._handleLeftBtnTap}
                className="waste-button waves-effect waves-light btn primary"
                >Show nearby composts!</a>
              {/*<Geosuggest
                className="address-suggest z-depth-1"
                placeholder="Enter your location..."
                onSuggestSelect={this._handleAddressSelected}
                />*/}
            </div>
          </div>

          <div className="col s6 choice">
            <div>
              <h2>I have</h2>
              <h1>compost</h1>
              <a className="compost-button waves-effect waves-light btn">Share it with others!</a>
            </div>
          </div>
          </div>
        </div>

        <div className="row about">
          <div className="col s4">
            Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb.
          </div>
          <div className="col s4">
            Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.
          </div>
          <div className="col s4">
            Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.
          </div>
        </div>

      </div>);
  }
}

export default createContainer(() => ({
  composts: [],
}), IndexPage);