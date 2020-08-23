import React from 'react'
import { Button } from 'react-native';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { ProductItem } from '../../components/shop/ProductItem';
import Colors from  '../../constants/Colors'
import * as productActions from '../../store/actions/products';

export const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate({
            routeName: 'EditProduct',
            params: {
                productId: id
            }
        });
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    editProductHandler(itemData.item.id);
                }}
            >
                <Button color={Colors.secondary} title="Edit" onPress={() => {
                    editProductHandler(itemData.item.id);
                }}></Button>
                <Button color={Colors.secondary} title="Delete" onPress={() => {
                    dispatch(productActions.deleteProduct(itemData.item.id));
                }}></Button>
            </ProductItem>
            )}
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return {
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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons>
        )
    }
}
