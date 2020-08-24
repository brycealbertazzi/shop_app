import React from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors'
import { CartItem } from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import { Card } from '../../components/UI/Card';

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
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1); // Sort cart items from first added to last added
    });

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.summaryAmount}>${Math.round(cartTotal.toFixed(2) * 100) / 100}</Text></Text>
                <Button
                 title="Order Now" 
                 color={Colors.secondary} 
                 disabled={cartItems.length <= 0}
                 onPress={() => {
                     dispatch(orderActions.addOrder(cartItems, cartTotal));
                 }}/>
            </Card>
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
                         deletable
                         onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                         }}
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
