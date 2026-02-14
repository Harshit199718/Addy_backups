import { Button, Modal } from "antd"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useDispatch } from "react-redux"
import { notification } from "../features/modalSlice"
import axios from "axios"
import { useState } from "react"
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { iconPerson } from "../assets/ipgeolocation/icon"

const IPGeolocation = ({ ipaddress }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [locationData, setLocationData ] = useState(null)
    const handleGetDetailIP = async () => {
        setOpen(true);
        try {
            const response = await axios.get(`https://ipapi.co/${ipaddress}/json/`);
            setLocationData(response.data)
            
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
        }
    }
    
    return (
        <>
        {
            ipaddress ?
            <span 
                onClick={() => handleGetDetailIP()}
                style={{ whiteSpace: 'normal', cursor: 'pointer' }}
            >
                {ipaddress} 
                <Icon icon="eos-icons:ip" width="1.2rem" height="1.2rem" /> 
            </span>
           :
           <span> <Icon icon="oui:ip" width="1.2rem" height="1.2rem" />  </span>
        }
        <Modal
            open={open}
            title="Maps"
            footer={[]}
            onCancel={() => {
                setOpen(false)
                setLocationData(null)
            }}
            destroyOnClose
        >
            {locationData && 
            <MapContainer style={{ height: "50vh"}} center={[locationData?.latitude, locationData?.longitude]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution={locationData && `Country: ${locationData.country_name} / Region: ${locationData.region} / City: ${locationData.city}`}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[locationData?.latitude, locationData?.longitude]}
                    icon={iconPerson}
                >
                    <Popup>
                        Country: {locationData.country_name} <br /> 
                        Region: {locationData.region} <br /> 
                        City: {locationData.city} <br />
                        Telco: {locationData.org}
                    </Popup>
                </Marker>
            </MapContainer>
            }
        </Modal>
      </>
    )
}

export default IPGeolocation;