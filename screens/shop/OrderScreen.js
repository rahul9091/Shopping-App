import React from 'react'
import {View,Text,FlatList } from 'react-native'
import {useSelector} from 'react-redux'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'



const OrderScreen =(props) => {
    const orders = useSelector(state=>{
        return state.orders.orders
    })
    return (
        <View>
    
    <FlatList
    data={orders}
    keyExtractor={prod=>prod.id}
    renderItem={({item})=>{
        return <OrderItem 
        totalAmount={item.totalAmount}
        items={item.items}

        />
    }}
    />
    </View>
    )
}


OrderScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Your Orders",
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : "ios-menu"}
        onPress={() => {
            navData.navigation.toggleDrawer()
        }}
        />
        </HeaderButtons>
    }
    
}

export default OrderScreen