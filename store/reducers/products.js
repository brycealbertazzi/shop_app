import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, updateProduct } from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS, // All products
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1') // Products which the user created
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                userProducts: state.userProducts.concat(newProduct),
                availableProducts: state.availableProducts.concat(newProduct)
            }
        
        case UPDATE_PRODUCT:
            const updatedProductIndex = state.userProducts.findIndex(p => p.id === action.pid);
            // Define the new product to replace with
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[updatedProductIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[updatedProductIndex].price
            );
            // Define the location in the user products to replace
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[updatedProductIndex] = updatedProduct;
            
            // Do the same for the available products
            const availableProdIndex = state.availableProducts.findIndex(p => p.id === action.pid);
            const updatedAvailableProducts = [...state.availableProducts]
            updatedAvailableProducts[availableProdIndex] = updatedProduct
            return {
                ...state,
                userProducts: updatedUserProducts,
                availableProducts: updatedAvailableProducts
            }

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