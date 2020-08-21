import PRODUCTS from '../../data/dummy-data'

const initialState = {
    availableProducts: PRODUCTS, // All products
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1') // Products which the user created
};

export default (state = initialState, action) => {
    return state;
};