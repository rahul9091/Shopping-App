import React from 'react';
import {Text,View ,FlatList,Button} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import Colors from '../../constants/Color'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../actions/cart'
import * as orderActions from '../../actions/order'

const CartScreen = () =>{
    const dispatch= useDispatch()
    
    const cartItems = useSelector(state=>{
        const transformedCartItems =[]
        for (const key in state.cart.items){
            transformedCartItems.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a,b) => a.productId > b.productId ? 1 : -1)
    })

    // const cartItems = useSelector(state=>{
    //     return state.cart.items
    // })

    const totalAmount = useSelector(state=>{
        return state.cart.totalAmount
    })

    return (
        <View style={{margin:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20,elevation:20,padding:10,backgroundColor:'white',borderRadius:10}}>
                <Text style={{fontWeight:'bold',fontSize:20,color:'red'}}>Total:<Text>${Math.round(totalAmount.toFixed(2) * 100 ) / 100}</Text></Text>
                <Button 
                color={Colors.accent} 
                title="Order Now" disabled={cartItems.length===0}
                onPress={() => {
                    dispatch(orderActions.addOrder(cartItems,totalAmount))
                }}
                />
            </View>
            <FlatList
            data={cartItems}
            renderItem={({item}) => {
                return (
                    <CartItem
                    title={item.productTitle}
                    price={item.productPrice}
                    quantity={item.quantity}
                    amount={item.sum}
                    deletable
                    onRemove={() => {
                        dispatch(cartActions.deleteFromCart(item.productId))
                    }}   
                    />
                )
            }}
            keyExtractor={item=>item.productId}
            />
        </View>
    )
};

CartScreen.navigationOptions = {
    headerTitle:'Your Cart'
}

export default CartScreen;