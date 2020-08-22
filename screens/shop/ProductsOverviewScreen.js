import React from 'react'
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as cartActions from '../../store/actions/cart';
import { ProductItem } from '../../components/shop/ProductItem';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';

export const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return (
        <FlatList
         data={products}
         keyExtractor={item => item.id}
         renderItem={itemData => 
            <ProductItem 
             image={itemData.item.imageUrl} 
             title={itemData.item.title} 
             price={itemData.item.price}
             onViewDetail={() => {
                 props.navigation.navigate({
                    routeName: 'ProductDetail',
                    params: {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title
                    }
                 });
             }}
             onAddToCart={() => {
                dispatch(cartActions.addToCart(itemData.item));
             }}
            />
         }
        />
    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate({
                            routeName: 'Cart'
                        });
                    }}
                />
            </HeaderButtons>
        )
    };
};
