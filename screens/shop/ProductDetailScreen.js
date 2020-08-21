import React from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors'

export const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts).find(p => p.id === productId);

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}></Image>
            <View style={styles.actions}>
                <Button color={Colors.secondary} title="Add to Cart" onPress={() => {}}></Button>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#aaa',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
});
