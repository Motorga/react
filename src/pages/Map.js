import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import { divIcon } from 'leaflet';
import UserContext from '../contexts/UserContext';
import { jsonParse } from '../helpers/helper';
import { getMarkers, addMarker, deleteMarker } from '../services/markerService';
import MarkerColorChoice from '../components/MarkerColorChoice';
import MarkerCustomIcon from '../components/MarkerCustomIcon';
import { toastNotification } from '../helpers/Toastify';

const Map = () => {
    const { user } = useContext(UserContext);
    const { id, lastname, firstname, bike, role } = jsonParse(user);
    const [ markers, setMarkers ] = useState([]);
    const [ position, setPosition ] = useState(null);
    const [ color, setColor ] = useState("#3B82F6");

    const LocationMarker = () => {
        useMapEvent('click', event => {
            setPosition(event.latlng);
        })

        return position === null ? null : (
            <Marker position={position} icon={divIcon({
                html: renderToStaticMarkup(<MarkerCustomIcon bgColor={color}/>),
            })}>
                <Popup>
                    {firstname} {lastname}
                    <br/>
                    {bike}
                </Popup>
            </Marker>
        )
    }

    const fetchMarkers = async () => {
        const locations = await getMarkers();
        if (locations) {
            setMarkers(locations.map(location => ({
                ...location,
                name: `${location.user.firstname} ${location.user.lastname}`,
                bike: location.user.bike
            })))
        }
    }

    useEffect(() => {
        fetchMarkers();
    }, []);

    const handleAddMarker = async () => {
        const result = await addMarker({color, position, userId: id});
        if (result) {
            toastNotification('success', 'Position mis à jour');
            setPosition(null);
            fetchMarkers();
        }
    }

    const handleDeleteMarker = async (id) => {
        const result = await deleteMarker(id);
        if (result) {
            toastNotification('success', 'Position supprimée');
            fetchMarkers();
        }
    }

    return (
        <div className="container">
            <div className="text-center">
                <h1>Carte des membres</h1>
            </div>
            <div className="d-flex flex-row-reverse align-items-center mb-2">
                <Button variant="success" onClick={() => handleAddMarker()}>Valider cette nouvelle position</Button>
                <MarkerColorChoice color={color} setColor={setColor} />
            </div>
            {/* center = Paris */}
            <MapContainer center={[48.8581817, 2.3454923]} zoom={10} scrollWheelZoom={true} style={{height: "500px"}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        icon={divIcon({
                            html: renderToStaticMarkup(<MarkerCustomIcon bgColor={marker.color} />),
                        })}
                    >
                        <Popup key={marker.id}>
                            {marker.name}
                            <br/>
                            {marker.bike}
                            <br/>
                            {(marker.user.id === id || role === 'ADMIN') && (
                                <div className="d-flex justify-content-end">
                                    <Trash
                                        className="text-danger cursor-pointer"
                                        size={18}
                                        onClick={() => handleDeleteMarker(marker.id)}
                                    />
                                </div>
                            )}
                        </Popup>
                    </Marker>
                ))}
                <LocationMarker />
            </MapContainer>
        </div>
    )
}

export default Map;