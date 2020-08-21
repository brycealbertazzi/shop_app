import React from 'react'
import { View, Text, StyleSheet } from 'react-native';


export const FontText = props => {
    return (
        <View>
            <Text>{props.children}</Text>
        </View>
    )
}


