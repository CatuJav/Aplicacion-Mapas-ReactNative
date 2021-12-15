import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapsScreen } from '../pages/MapsScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';
import { PermissionContext } from '../context/PermissionContext';
import { useContext } from 'react';
import { LoadingScreen } from '../pages/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator=()=> {

  const {permissions} = useContext(PermissionContext)

  if (permissions.locationStatus =='unavailable') {
    return <LoadingScreen/>
  }

  return (
    <Stack.Navigator
        initialRouteName='PermissionsScreen'
        screenOptions={{
            headerShown:false,
            cardStyle:{
                backgroundColor:'white'
            }
        }}
    >
      {
        (permissions.locationStatus=='granted')
        ?
        <Stack.Screen name="MapsScreen" component={MapsScreen} />
        :
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      }

    </Stack.Navigator>
  );
}