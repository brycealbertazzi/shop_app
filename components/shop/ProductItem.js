import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import { Card } from '../UI/Card';

export const ProductItem = props => {
    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        // Touchable Component adds the ripple effect on android
        // Version 21 is the minimum version which supports the ripple effect
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        // TouchableOpacity turns the entire view into a clickable object like a button
        // useForeground makes TouchableComponent respect the image and all elements in the view in the ripple effect
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={props.onSelect} useForeground> 
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.image}}></Image>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            {/* Always return price to 2 decimal places with toFixed(2) */}
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text> 
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        paddingTop: 5
    },
    title: {
        fontSize: 20,
        marginVertical: 4,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 16,
        color: '#999',
        fontFamily: 'open-sans'
    },
    actions: {
        flexDirection: 'row', // To have the buttons sit next to eachother in a row
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        height: '25%'
    }
});
