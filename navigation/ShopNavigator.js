import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

import { ProductsOverviewScreen } from '../screens/shop/ProductsOverviewScreen';
import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen';
import { CartScreen } from '../screens/shop/CartScreen';
import { OrdersScreen } from '../screens/shop/OrdersScreen';
import Order from '../models/order';
import { Ionicons } from '@expo/vector-icons';

const commonDefaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
    },
    headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white',
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleSyle: {
        fontFamily: 'open-sans'
    }
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: {
        screen: ProductDetailScreen
    },
    Cart: {
        screen: CartScreen
    }
}, 
{
    navigationOptions: { // Used if this Navigator is inside of another navigator
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === 'android' ? 'md-cart': 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
        ></Ionicons>
    },
    defaultNavigationOptions: commonDefaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, 
{
    navigationOptions: { // Used if this Navigator is inside of another navigator
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list': 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            ></Ionicons>
        )
    },
    defaultNavigationOptions: commonDefaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
    Products: {
        screen: ProductsNavigator
    },
    Orders: {
        screen: OrdersNavigator
    }
}, 
{
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);
