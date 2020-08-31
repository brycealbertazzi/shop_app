import React, { useEffect, useCallback, useReducer } from 'react'
import { View, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import { Input } from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        // Update our form state upon entering text
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            // Loops through all inputs in form, if one of them is false then formIsValid gets changed to false
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
        }
    }

    return state;
}

export const EditProductsScreen = props => {
    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(p => p.id === prodId));
    const [formState, dispatchFormState] = useReducer(formReducer, {
        // Initial state for form validator reducer
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Invalid Input!', 'Please fix all errors in the form.', [{text: 'OK'}])
            return;
        }

        if (editedProduct) {
            // Dispatch the UPDATE_PRODUCT action
            dispatch(productsActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
            ));
        } else {
            // Dispatch the CREATE_PRODUCT action
            dispatch(productsActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            ));
        }
        props.navigation.goBack(); // Navigate back automatically after submitting a product
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler});
    }, [submitHandler]);
    
    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect={false}
                        returnKeyType='next'
                        errorText='Please enter a valid title'
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    >
                    </Input>
                    <Input
                        id='imageUrl'
                        label='Image URL'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect={false}
                        returnKeyType='next'
                        errorText='Please enter a valid imageURL'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                        min={0}
                    >
                    </Input>
                    {!editedProduct && 
                    <Input
                        id='price'
                        label='Price'
                        keyboardType='decimal-pad'
                        autoCapitalize='sentences'
                        autoCorrect={false}
                        returnKeyType='next'
                        errorText='Please enter a valid price'
                        onInputChange={inputChangeHandler}
                        required={!editedProduct ? true : false}
                    >
                    </Input>
                    }
                    <Input
                        id='description'
                        label='Description'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect={false}
                        returnKeyType='done'
                        errorText='Please enter a valid description'
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    >
                    </Input>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    }
});
