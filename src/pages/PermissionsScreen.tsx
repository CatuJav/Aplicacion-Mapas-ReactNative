import React, { useContext } from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions'
import { BlackButton } from '../components/BlackButton'
import { PermissionContext } from '../context/PermissionContext'

export const PermissionsScreen = () => {

    const {permissions,askLocationPermission} = useContext(PermissionContext);

   
    return (
        <View style={styles.container}>
            <Text style={{
                ...styles.title
            }}

            >Para usar esta aplicación es necesario el uso del GPS</Text>

            <BlackButton
                title='Permiso'
                onPress={()=>askLocationPermission()}
            />
            <Text>
                {JSON.stringify(permissions,null,5)}
            </Text>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        width:200,
        fontSize:18,
        textAlign:'center',
        marginBottom:20
    }
})