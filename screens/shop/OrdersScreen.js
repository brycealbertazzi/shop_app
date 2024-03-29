import React from 'react'
import { Text, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import { OrderItem } from '../../components/shop/OrderItem';

export const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList
         data={orders}
         keyExtractor={item => item.id}
         renderItem={itemData => <OrderItem
            total={itemData.item.total}
            date={itemData.item.readableDate}
            items={itemData.item.items}
         />
         }
        />
    );
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    }
}
