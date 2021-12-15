import React from 'react'
import { Text, View } from 'react-native'

import { Map } from '../components/Map';


export const MapsScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Map markers={[]}/>

        </View>
    )
}
