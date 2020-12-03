import React from 'react'
import {createAppContainer} from 'react-navigation'
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import {Platform} from 'react-native';
import { createStackNavigator} from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import OrderScreen from '../screens/shop/OrderScreen'
import EditProductScreen from '../screens/user/EditProductScreen'


import Colors from '../constants/Color';
import UserProductsScreen from '../screens/user/UserProductsScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen'
import { Ionicons,FontAwesome } from '@expo/vector-icons';

const defaultNavigation = {
    headerTitle:"All Products",
    headerStyle:{
        backgroundColor:Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTintColor:Platform.OS==="android" ? 'white' :Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview:ProductOverviewScreen,
    ProductsDetail:ProductDetailScreen,
    Cart:CartScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : "ios-cart"} size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultNavigation
})

const OrdersNavigator = createStackNavigator({
    order:OrderScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : "ios-list"} size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions:defaultNavigation
})

const UserNavigator = createStackNavigator({
    users:UserProductsScreen,
    EditProduct:EditProductScreen
},{
    navigationOptions:{
        drawerIcon:drawerConfig => <FontAwesome name="shopping-basket" size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions:defaultNavigation
})

const ShopNavigator = createDrawerNavigator({
    products:ProductsNavigator,
    Order:OrdersNavigator,
    UserProduct:UserNavigator
},{
    contentOptions:{
        activeTintColor:Colors.primary
    }
})
export default createAppContainer(ShopNavigator)