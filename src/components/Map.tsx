import Geolocation from '@react-native-community/geolocation';
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'

//Si en un futuro quiero varios marcadors
interface Props{
    markers:Marker[];
}

export const Map = ({markers}:Props) => {

    useEffect(() => {
        Geolocation.getCurrentPosition(
            info => console.log(info),
            (error)=>console.log(error),
            {
                distanceFilter:100,
                enableHighAccuracy:true
            });

    }, [])

    return (
        <>
            <MapView
                style={{ flex: 1 }}
                showsUserLocation={true}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
            
                    image={require('../assests/custom-marker.png')}
                    coordinate={{
                        latitude:37.7885,
                        longitude:-122.4324,
                    }}
                    title='Este es un título'
                    description='Esto es la descripción de un marcador'
                />
            </MapView>
            </>
            )
}
