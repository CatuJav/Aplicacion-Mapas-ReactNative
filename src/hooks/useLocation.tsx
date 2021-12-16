import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { Location } from '../interfaces/appinterfaces';


export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude:0,
        longitude:0
    });
    useEffect(() => {
      
        getCurrectLocation()
            .then(location=>{
                setInitialPosition(location);
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

    return {
        hasLocation,
        initialPosition,
        getCurrectLocation
    }
}
