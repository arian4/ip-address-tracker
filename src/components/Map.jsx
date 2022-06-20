import { MapContainer, TileLayer, Marker , Popup , useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

function LocationMarker({ coords }) {
    // const [position, setPosition] = useState(null)
    const position = [coords.lat, coords.lng]
    const map = useMapEvents({
      mouseover(){
        map.flyTo(coords, map.getZoom())
      }
      
    })
  
    return coords === null ? null : (
        
      <Marker position={position}>
        
        <Popup>You are here</Popup>
      </Marker>
    )
}
  

export default function Map({coords , loading}) {
  return (
    <>
        {
        !loading &&
        <MapContainer className='h-screen' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker coords={coords} />
    </MapContainer>
    }
    </>
    
    
  )
}
