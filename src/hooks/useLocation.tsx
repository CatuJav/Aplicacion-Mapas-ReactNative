//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import { useEffect, useRef, useState } from 'react';
import { Location } from '../interfaces/appinterfaces';


export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude:0,
        longitude:0
    });

    const [userLocation, setUserLocation] = useState<Location>({
        latitude:0,
        longitude:0
    })

    const watchId = useRef<number>();

    useEffect(() => {
      
        getCurrectLocation()
            .then(location=>{
                setInitialPosition(location);
                setUserLocation(location);
                setHasLocation(true);
            })
    }, [])

    //Para mostrar la camara en base a la ubicacion
    const getCurrectLocation=():Promise<Location>=>{
        return new Promise((resolve,reject)=>{
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                  
                },
                (error) => reject({error}),
                {
                    enableHighAccuracy: true
                });
        })
    }

    const followUserLocation = ()=>{
        watchId.current= Geolocation.watchPosition(                (
            { coords }) => {
              //  console.log({coords})
                setUserLocation({
                    longitude:coords.longitude,
                    latitude:coords.latitude
                })
          
        },
        (error) => console.log('s'),
        {
            enableHighAccuracy: true, distanceFilter:10
        })
    }

    const stopFollowUserLocation=()=>{
        if (watchId.current) {
            
            Geolocation.clearWatch(watchId.current);
        }
    }

    return {
        hasLocation,
        initialPosition,
        getCurrectLocation,
        followUserLocation,
        stopFollowUserLocation,
        userLocation
    }
}
