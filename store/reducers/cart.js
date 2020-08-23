import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { add } from "react-native-reanimated";
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    total: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            if (state.items[addedProduct.id]) {
                // We already have the item in the cart, so add to the quantity
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].total + productPrice
                );
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]: updatedCartItem },
                    total: state.total + productPrice
                }
            } else {
                const newCartItem = new CartItem(1, productPrice, productTitle, productPrice);
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]: newCartItem },
                    total: state.total + productPrice
                }
            }

        case REMOVE_FROM_CART:
            const removedProduct = state.items[action.pid];
            const updatedCartTotal = (state.total - removedProduct.productPrice);
            updatedCartTotal.toFixed(2);

            if (removedProduct.quantity > 1) {
                const updatedProductTotal = removedProduct.total - removedProduct.productPrice;
                updatedProductTotal.toFixed(2);
                const updatedCartItem = new CartItem(
                    removedProduct.quantity - 1,
                    removedProduct.productPrice,
                    removedProduct.productTitle,
                    updatedProductTotal
                );
                return {
                    ...state,
                    items: { ...state.items, [action.pid]: updatedCartItem },
                    total: updatedCartTotal
                }
            } else {
                const updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid]; // Deletes the item with an id of action.pid from updatedCardItems
                return {
                    ...state,
                    items: updatedCartItems,
                    total: updatedCartTotal
                }
            }

        case ADD_ORDER:
            // Clears the cart when adding an order
            return initialState

        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state;
            }
            const updatedItems = {...state.items};
            const updatedTotal = state.total - state.items[action.pid].total
            delete updatedItems[action.pid];

            return {
                ...state,
                items: updatedItems,
                total: updatedTotal
            }

        default:
    }
    return state;
}