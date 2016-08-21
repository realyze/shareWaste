/* global google */

import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap, Marker, SearchBox} from "react-google-maps";
import { autobind } from 'core-decorators';
import * as _ from 'lodash';

const inputStyle = {
  "border": `1px solid transparent`,
  "borderRadius": `1px`,
  "boxShadow": `0 2px 6px rgba(0, 0, 0, 0.3)`,
  "boxSizing": `border-box`,
  "MozBoxSizing": `border-box`,
  "fontSize": `14px`,
  "height": `32px`,
  "marginTop": `27px`,
  "outline": `none`,
  "padding": `0 12px`,
  "textOverflow": `ellipses`,
  "width": `50%`,
  "min-width": `15rem`,
  "background-color": "#FFFFFF"
};

function mongo2google(loc) {
  return new google.maps.LatLng(loc[1], loc[0]);
}

@autobind
class SimpleMap extends Component {

  state = {};

  constructor(props) {
    super(props);

    this.searchBox = null;
    this.map = null;
  }

  handleBoundsChanged() {
    const center = this.map.getCenter()
    const data = {
      bounds: this.map.getBounds(),
      center,
    };
    this.props.onMapChanged(data);
    this.setCenter({lat: center.lat(), lng: center.lng()});
  }

  handlePlacesChanged() {
    const places = this.searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    //const markers = places.map(place => ({ position: place.geometry.location }));

    // Set markers; set map center to first search result
    const mapCenter = places.length > 0 ? places[0].geometry.location : this.state.center;

    this.setCenter({
      lat: mapCenter.lat(),
      lng: mapCenter.lng(),
    });

    this.setState({
      zoom: 14,
    });
  }

  setCenter({lat, lng}) {
    this.setState({ center: { lat, lng } });
  }

  onZoomChanged() {
    this.setState({ zoom: this.map.props.map.zoom });
  }

  render() {
    //console.log('map props', this.props, this.state);
    console.log('map props', this.props);
    return (<section style={{ height: `100%` }}>
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props.containerElementProps}
            style={{
              height: `100%`,
            }}
            />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => this.map = map}
            zoom={this.state.zoom || this.props.initialZoom || 11}
            center={new google.maps.LatLng(this.state.center || this.props.initialLocation)}
            onClick={this.props.onMapClick}
            onZoomChanged={this.onZoomChanged}
            onBoundsChanged={_.debounce(this.handleBoundsChanged, 50)}
            >
            {
              this.props.showSearchBox &&
                <SearchBox
                  controlPosition={google.maps.ControlPosition.TOP_LEFT}
                  onPlacesChanged={this.handlePlacesChanged }
                  ref={(ref) => this.searchBox = ref}
                  placeholder="Enter your location..."
                  style={inputStyle}
                  />
            }
            {
              this.props.markers.map(marker => {
                const selected = marker._id === this.props.selectedMarkerId;
                const iconUrl = selected ? '/images/farm_marker_selected.png' : '/images/farm_marker.png';
                return (<Marker
                  key={marker._id}
                  icon={iconUrl}
                  position={mongo2google(marker.location.coordinates)}
                  onClick={() => this.props.onMarkerClick(marker) }
                  onRightclick={() => this.props.onMarkerRightclick(marker)}
                  />);
              })
            }
          </GoogleMap>
        }
        />
    </section>);
  }
}

export default SimpleMap;