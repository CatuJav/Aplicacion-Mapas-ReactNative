import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation'
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

//Si en un futuro quiero varios marcadors
interface Props{
    markers:Marker[];
}

export const Map = ({markers}:Props) => {
    
    const {hasLocation,initialPosition,getCurrectLocation}=useLocation();
    
    const mapViewRef = useRef<MapView>();
    const centerPosition=async()=>{
        const location = await getCurrectLocation();
        mapViewRef.current?.animateCamera({
            center:location,
            zoom:14
        });
    }



    if (!hasLocation) {
        return<LoadingScreen/>
    }

    return (
        <>
            <MapView
                ref={(el)=>{mapViewRef.current=el!}}
                style={{ flex: 1 }}
                showsUserLocation={true}
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* <Marker

                    image={require('../assests/custom-marker.png')}
                    coordinate={{
                        latitude:37.7885,
                        longitude:-122.4324,
                    }}
                    title='Este es un título'
                    description='Esto es la descripción de un marcador'
                /> */}
            </MapView>
            <Fab
                    iconName='compass-outline'
                    onPress={centerPosition}
                    style={{
                        position:'absolute',
                        bottom:20,
                        right:20,
                    }}
                />
            </>
            )
}
