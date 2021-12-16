import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation'
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

//Si en un futuro quiero varios marcadors
interface Props{
    markers:Marker[];
}

export const Map = ({markers}:Props) => {
    
    const [showPolyline, setShowPolyline] = useState(true);

    const {
        hasLocation,
        initialPosition,
        getCurrectLocation,
        followUserLocation, 
        userLocation,
        stopFollowUserLocation,
        routeLines
    }=useLocation();
    
    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    useEffect(() => {
        followUserLocation();
        //TODO cancelar el seguimiento
        return ()=>{
            stopFollowUserLocation();
        }
    }, [])

    useEffect(() => {
        if (!following.current) {
            return;
        }
        const {latitude,longitude}=userLocation;
        mapViewRef.current?.animateCamera({
            center:{
                latitude,longitude
            },
            zoom:14
        });
    }, [userLocation])

    const centerPosition=async()=>{
        const location = await getCurrectLocation();
        following.current=true;
        mapViewRef.current?.animateCamera({
            center:location,
            zoom:15
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
                onTouchStart={()=>following.current=false}
            >
                {
                showPolyline && (<Polyline
                    coordinates={routeLines}
                    strokeColor='black'
                    strokeWidth={3}
                />)}
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
            <Fab
                    iconName='brush-outline'
                    onPress={()=>setShowPolyline(!showPolyline)}
                    style={{
                        position:'absolute',
                        bottom:80,
                        right:20,
                    }}
                />
            </>
            )
}
