import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'; 

export function MyMapComponent(props) {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 49.26, lng: 32.03 }}
    />
  )
}

export const Map = withScriptjs(withGoogleMap(MyMapComponent));