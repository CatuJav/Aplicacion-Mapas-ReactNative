import React from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'


interface Props{
    title:string;
    onPress:()=>void;
    style?:StyleProp<ViewStyle>
}

export const BlackButton = ({title,onPress,style={}}:Props) => {
    return (
        <TouchableOpacity 
            activeOpacity={0.9}
            onPress={onPress}
            style={{
                ...style as any,
                ...styles.blackButton,
            }}
        >
            <Text style={{
                ...styles.buttonText
            }}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    blackButton:{
        height:50,
        width:200,
        backgroundColor:'rgba(0,0,0,0.85)',
        borderRadius:60,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:3
        },
        elevation:6
        
    },
    buttonText:{
        color:'white',
        fontSize:18
    }
})