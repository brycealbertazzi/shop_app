import { ADD_TO_CART } from "../actions/cart";
import { add } from "react-native-reanimated";
import CartItem from '../../models/cart-item';

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

        default:
    }
    return state;
}