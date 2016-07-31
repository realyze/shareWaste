import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap, Marker, SearchBox} from "react-google-maps";
import {extend} from 'lodash';

function renderMarker(marker, index, props) {
  return (<Marker
    key={marker._id}
    position={marker.position}
    onClick={props.handleMarkerClick}
    onRightclick={() => props.onMarkerRightclick(marker) }
    />)
}

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
  "width": `400px`,
  "background-color": "#FFFFFF"
}

const defaultMapCenter = {
  lat: 47.6205588,
  lng: -122.3212725,
}


class SimpleMap extends Component {

  constructor(props) {
    super(props);

    this.searchBox = null;
    this.map = null;

    this.state = {
      center: props.initialLocation,
      bounds: null,
      markers: props.markers
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      markers: props.markers
    });
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this.map.getBounds(),
      center: this.map.getCenter(),
    });
  }

  handlePlacesChanged() {
    const places = this.searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    //const markers = places.map(place => ({ position: place.geometry.location }));

    // Set markers; set map center to first search result
    const mapCenter = places.length > 0 ? places[0].geometry.location : this.state.center;

    this.setCenter({
      lat: mapCenter.lat(),
      lng: mapCenter.lng()
    });
  }

  setCenter({lat, lng}) {
    this.setState({ center: { lat, lng } });
  }

  render() {
    return <section style={{ height: `100%` }}>
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
            zoom={15}
            center={this.state.center || this.state.defaultCenter}
            onClick={this.props.onMapClick}
            onBoundsChanged={this.handleBoundsChanged.bind(this) }
            >
            <SearchBox
              bounds={this.state.bounds}
              controlPosition={google.maps.ControlPosition.TOP_LEFT}
              onPlacesChanged={this.handlePlacesChanged.bind(this) }
              ref={(ref) => this.searchBox = ref}
              placeholder="Type to search..."
              style={inputStyle}
              />
            {
              this.state.markers.map(marker => <Marker
                key={marker._id}
                position={marker.position}
                onClick={() => this.props.onMarkerClick(marker) }
                onRightclick={() => this.props.onMarkerRightclick(marker) }
                />
              )
            }
          </GoogleMap>
        }
        />
    </section>
  };
};

export default SimpleMap;