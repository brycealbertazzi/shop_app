import React from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors'
import { CartItem } from '../../components/shop/CartItem';

export const CartScreen = props => {
    const cartTotal = useSelector(state => state.cart.total);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                total: state.cart.items[key].total
            });
        }
        return transformedCartItems;
    });
    console.log(cartItems);

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.summaryAmount}>${cartTotal.toFixed(2)}</Text></Text>
                <Button title="Order Now" color={Colors.secondary} disabled={cartItems.length <= 0}/>
            </View>
            <View>
                <Text>CART ITEMS</Text>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.productId} // We do need the keyExtractor here
                    renderItem={itemData =>
                        <CartItem
                         quantity={itemData.item.quantity}
                         title={itemData.item.productTitle}
                         amount={itemData.item.total}
                         onRemove={() => {}}
                        />
                    }
                />
            </View>
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 8,
        elevation: 5, // To have shadow effect on android
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    summaryAmount: {
        color: Colors.secondary
    }
});