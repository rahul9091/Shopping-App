import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';
import PRODUCTS from '../data/dummy-data';
import product from '../models/product'

const initialState = {
    availabelProducts:PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default productsReducer = (state=initialState,action) => {
    switch(action.type){
        case CREATE_PRODUCT:
            const newProduct = new product(
                new Date().toString,'u1',action.productData.title,action.productData.imageUrl,action.productData.description,action.productData.price)
                return {
                    ...state,
                    availabelProducts: state.availabelProducts.concat(newProduct),
                    userProducts: state.userProducts.concat(newProduct)
                }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid)
            const updatedProduct = new product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
                )
            const updatedUserProducts = {...state.userProducts}
            updatedUserProducts[productIndex] = updatedProduct

            const availabelProductIndex = state.availabelProducts.findIndex(prod=>prod.id === action.pid)
            const updatedAvailabelProduct = {...state.availabelProducts}
            updatedAvailabelProduct[availabelProductIndex] = updatedProduct
            return {
                ...state,
                availabelProducts:updatedAvailabelProduct,
                userProducts:updatedUserProducts
            }
        case DELETE_PRODUCT:
         return {
             ...state,
             userProducts:state.userProducts.filter(product=> product.id !==action.pId),
             availabelProducts:state.availabelProducts.filter(product=>product.id !== action.pId)
         }
        
    }

    return state
}