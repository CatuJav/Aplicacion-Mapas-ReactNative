//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import { useEffect, useRef, useState } from 'react';
import { Location } from '../interfaces/appinterfaces';


export const useLocation = () => {
    //Para almacenar las posiciones del usuario
    const [routeLines, setRouteLines] = useState<Location[]>([])

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
    //Par ver si esta desmontado el componente
    const isMounted = useRef(true);
    useEffect(() => {
        isMounted.current=true;
        //El return se llama es cuando ya esta desmontado el componente
        return ()=>{
        isMounted.current=false;
        }
    }, [])


    useEffect(() => {
      
        getCurrectLocation()
            .then(location=>{
                if (!isMounted.current) {
                    return;
                }
                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines(routes=>[...routes, location]);
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
                if(!isMounted.current) return;
            const location:Location={
                latitude:coords.latitude,
                longitude:coords.longitude
            }
              //  console.log({coords})
                setUserLocation({
                    longitude:coords.longitude,
                    latitude:coords.latitude
                })
            setRouteLines(routes=>[...routes, location]);    
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
        userLocation,
        routeLines
    }
}
