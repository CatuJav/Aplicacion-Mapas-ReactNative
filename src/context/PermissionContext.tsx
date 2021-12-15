import React, { createContext, useState } from "react";
import { Platform } from "react-native";
import { PERMISSIONS, PermissionStatus, request } from "react-native-permissions";

export interface PermissionState{
    locationStatus: PermissionStatus;
    //Puedo poner los demás como cámara
}

export const permissionInitState:PermissionState={
    locationStatus:'unavailable'
}

//Tipado o tambien puede ser una interfaz
type PermissionContextProps={
    permissions:PermissionState;
    askLocationPermission:()=>void;
    checkLocationPermission:()=>void;
}

export const PermissionContext= createContext({} as PermissionContextProps);//TODO qué exporta

export const PermissionsProvider=({children}:{children:JSX.Element})=>{
    
    const [permissions, setPermissions] = useState(permissionInitState);

    const askLocationPermission =async()=>{
        //Condiciones para ver los permios
        let permissionStatus:PermissionStatus;
        if (Platform.OS==='ios') {
            
           //permissionStatus=await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
           permissionStatus=await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{
           // permissionStatus=await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            permissionStatus=await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        setPermissions({
            ...permissions,
            locationStatus:permissionStatus
        })
    }
    const checkLocationPermission =()=>{}
    

    return (
        <PermissionContext.Provider 
            value={{
                permissions,
                askLocationPermission,
                checkLocationPermission
            }}
        >
            {children}
        </PermissionContext.Provider>
    )
}