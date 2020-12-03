
import { ADD_TO_CART, DELETE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from '../actions/order';
import { DELETE_PRODUCT } from "../actions/products";
import CartItem from '../models/cart-item'; 


const initialState ={
items:{},
totalAmount: 0
};

export default cartReducer = (state=initialState,action) =>{
    switch(action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title 
            
            if(state.items[addedProduct.id]){
                //already we have the items in the cart
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
                return {
                    ...state,
                    items:{...state.items,[addedProduct.id]:updatedCartItem},
                    totalAmount:state.totalAmount + prodPrice
                }
            }else {
                const newCartItem = new CartItem(1,prodPrice,prodTitle,prodPrice)
                return {
                    ...state,
                    items:{...state.items,[addedProduct.id]:newCartItem},
                    totalAmount: state.totalAmount + prodPrice
            }
        }
        case DELETE_FROM_CART:
            const selectedCartItem = state.items[action.pid]
            const currentQty = selectedCartItem.quantity
            let updatedCartItems
            if(currentQty > 1){
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity -1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                )
                updatedCartItems={...state.items , [action.pid]:updatedCartItem}
            }else{
                 updatedCartItems = {...state.items}
                 delete updatedCartItems[action.pid]
            }
            return {
                ...state,
                items:updatedCartItems,
                totalAmount:state.totalAmount - selectedCartItem.productPrice
            }
            case ADD_ORDER:
                return initialState

            case DELETE_PRODUCT:
                if(!state.items[action.pId]){
                    return state
                }
                const updatedItems = {...state.items}
                const itemTotal = state.items[action.pId].sum
                delete updatedItems[action.pId]
                return {
                    ...state,
                    items:updatedItems,
                    totalAmount:state.totalAmount- itemTotal
                }
              }
            
              
    return state;
}