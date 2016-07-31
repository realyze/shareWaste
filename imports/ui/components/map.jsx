import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

function renderMarker(marker, index, props) {
  return (<Marker
    key={index}
    position={marker.position}
    onClick={props.handleMarkerClick}
    //onRightclick={() => props.onMarkerRightclick(index)}
  />)
}

const SimpleMap = props => (
  <section style={{ height: `100%` }}>
    <GoogleMapLoader
      containerElement={
        <div
          {...props.containerElementProps}
          style={{
            height: `60%`,
          }}
        />
      }
      googleMapElement={
        <GoogleMap
          //ref={(map) => console.log(map)}
          zoom={15}
          center={props.location}
          //onClick={props.onMapClick}
        >
          {(props.markers ||[]).map((marker, index) => {
            return renderMarker(marker, index, props);
          })}
        </GoogleMap>
      }
    />
  </section>
);

export default SimpleMap;