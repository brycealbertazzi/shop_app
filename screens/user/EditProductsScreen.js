import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

export const EditProductsScreen = props => {
    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(p => p.id === prodId));

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            // Dispatch the UPDATE_PRODUCT action
            dispatch(productsActions.updateProduct(
                prodId,
                title,
                description,
                imageUrl
            ));
        } else {
            // Dispatch the CREATE_PRODUCT action
            dispatch(productsActions.createProduct(
                title,
                description,
                imageUrl,
                +price
            ));
        }
        props.navigation.goBack(); // Navigate back automatically after submitting a product
    }, [dispatch, prodId, title, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler});
    }, [submitHandler]);
    
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)}></TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)}></TextInput>
                </View>
                {!editedProduct && <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)}></TextInput>
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)}></TextInput>
                </View>
            </View>

        </ScrollView>
    )
}

EditProductsScreen.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Save'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFunction}
                />
            </HeaderButtons>
        )
    };
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1
    }
});
