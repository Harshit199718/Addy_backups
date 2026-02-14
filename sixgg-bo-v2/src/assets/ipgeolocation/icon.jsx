import L from 'leaflet';
import mapPin from './map-pin.svg'
// import mapPin from './map-pin.png'

const iconPerson = new L.Icon({
    iconUrl: mapPin,
    iconRetinaUrl: mapPin,
    popupAnchor:  [-0, -30],
    iconSize: new L.Point(60, 75),
});

export { iconPerson };