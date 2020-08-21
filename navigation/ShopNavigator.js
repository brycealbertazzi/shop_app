import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

import { ProductsOverviewScreen } from '../screens/shop/ProductsOverviewScreen';

const commonDefaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
    },
    headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white'
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: commonDefaultNavOptions
});

export default createAppContainer(ProductsNavigator);
