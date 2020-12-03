import order from '../models/order'
import {ADD_ORDER} from '../actions/order'

const initialState= {
    orders:[]
}

export default orderReducer = (state=initialState,action) => {
    switch(action.type) {
        case ADD_ORDER:
            const newOrder = new order(new Date().toString(),action.orderData.items,action.orderData.amount,new Date())
        return {
            ...state,
            orders:state.orders.concat(newOrder)
        }
    }
    return state;
    }
    