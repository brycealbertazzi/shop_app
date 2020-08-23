import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS, // All products
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1') // Products which the user created
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(p => p.id !== action.pid),
                availableProducts: state.availableProducts.filter(p => p.id !== action.pid)
            }

        default:
            return state;
    }
};