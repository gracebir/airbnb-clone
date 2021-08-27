import { useState } from 'react';
import ReactMapGL,{ Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';

// mapbox style
const mapStyle = "mapbox://styles/ps-program/cksuhqx7u55u218mrl8omwca3";


function Map({searchResults}) {

    const [selectedLocation, setSelectedLocation] = useState({});

    const coordonates = searchResults?.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    // The 
   const center = getCenter(coordonates);
 
   console.log(selectedLocation);

   const [viewport, setViewport] = useState({
    width:"100%",
    height: '100%',
    latitude: center.latitude,
    longitude:center.longitude,
    zoom:11,
    })

    return (
        <ReactMapGL
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewPort)=>{
            setViewport(nextViewPort)
        }}
        >
            {searchResults?.map((result,i)=>(
                <div key={i}>
                    <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                    >
                        <p
                        role="img"
                        onClick={()=> setSelectedLocation(result)}
                        className="cursor-pointer text-2xl animate-bounce"
                        aria-label="push-pin"
                        >📌</p>
                    </Marker>
                    {/* The popup that should be show if we click on a marker */}
                    { selectedLocation?.long === result.long ? (
                        <Popup
                        onClose={()=> setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
