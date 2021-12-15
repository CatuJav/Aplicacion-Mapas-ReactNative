import React, { createContext, useState } from "react";
import { PermissionStatus } from "react-native-permissions";

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
    const askLocationPermission =()=>{}
    const checkLocationPermission =()=>{}
    const [permissions, setPermissions] = useState(permissionInitState);

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