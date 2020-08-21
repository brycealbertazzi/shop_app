import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Colors from '../../constants/Colors';

export const ProductItem = props => {
    return (
        <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.image}}></Image>
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                {/* Always return price to 2 decimal places with toFixed(2) */}
                <Text style={styles.price}>${props.price.toFixed(2)}</Text> 
            </View>
            <View style={styles.actions}>
                <Button color={Colors.secondary} title="View Details" onPress={props.onViewDetail}></Button>
                <Button color={Colors.secondary} title="Cart" onPress={props.onAddToCart}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 3},
        elevation: 5, // To have shadow effect on android
        borderRadius: 10, 
        backgroundColor: 'white',
        height: 300,
        margin: 20
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
        marginVertical: 4
    },
    price: {
        fontSize: 16,
        color: '#aaa'
    },
    actions: {
        flexDirection: 'row', // To have the buttons sit next to eachother in a row
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        height: '25%'
    }
});
