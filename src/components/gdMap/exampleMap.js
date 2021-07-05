import React, { useEffect, useRef, Fragment } from 'react';
import { Map, APILoader } from '@uiw/react-amap';
import AMap from 'AMap'
function Demo() {
  const mapRef = useRef();
  useEffect(() => {
    console.log('mapRef:', mapRef)
  }, []);
  return (
    <div style={{ width: '100%', height: 330 }}>
      <Map
        layers={[new AMap.TileLayer.Satellite()]}
        ref={(instance) => {
          if (instance && instance.map) {
            const bounds = instance.map.getBounds();
            console.log('instance', instance);
          }
        }}
      />
      {/* <Map
        layers={[new AMap.TileLayer.Satellite()]}
        ref={mapRef}
      /> */}
    </div>
  );
}

export default Demo;