import React from 'react'
import { View, StyleSheet } from 'react-native';

export const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 8,
        elevation: 5, // To have shadow effect on android
        borderRadius: 10, 
        backgroundColor: 'white',
    }
});
