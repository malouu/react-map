import React from 'react'


import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


const containerStyle = {
  width: '1000px',
  height: '600px'
  
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCMU6JkPd-gxcluSvViA5giGNR8PtQHja0"
  })

  const [map, setMap] = React.useState(null)
  const ref = React.useRef(null);

React.useEffect(() => {
  if (ref.current && !map) {
    setMap(new window.google.maps.Map(ref.current, {}));
}
}, [ref, map]);


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
//const [zoom, setZoom] = React.useState(3); // initial zoom
const [center, setCenter] = React.useState({
  lat: 0,
  lng: 0,
});

const [clicks, setClicks] = React.useState([]);
const onClick = (e) => {
  // avoid directly mutating state
  setClicks([...clicks, e.latLng]);
  console.log("latitude = ", e.latLng.lat());
  console.log("longtitude = ", e.latLng.lng());
};


const drawMarker = (Marker) => {
  return Marker.cords.map((store, i) => {
    return (
      <Marker
        key={i}
        id={i}
        position={{
          lat: store.latitude,
          lng: store.longitude,
        }}
        onClick={() => console.log("Event Hanlder Called")}
      />
    );
  });
};

 
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
        
      >
        
        
        <></>
        
      </GoogleMap>

  ) : <></>
}



export default React.memo(MyComponent)


