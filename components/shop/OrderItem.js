import React, {useState} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';

import { CartItem } from './CartItem';
import Colors from '../../constants/Colors'

export const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.total.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails ? 'Hide Details' : 'Show Details'} onPress={() => {
                setShowDetails(prevState => !prevState); //Reverse the boolean showDetails
            }}></Button>
            {showDetails && <View style={styles.detailItems}>
                {props.items.map(cartItem => <CartItem
                    quantity={cartItem.quantity}
                    amount={cartItem.total}
                    title={cartItem.productTitle}
                    key={cartItem.productId}
                />
                )}    
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 8,
        elevation: 5, // To have shadow effect on android
        borderRadius: 10, 
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#999'
    },
    detailItems: {
        width: '100%'
    }
});
