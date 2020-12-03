
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import ProductOverviewScreen from './screens/shop/ProductOverviewScreen';
import {Provider } from 'react-redux'
import {createStore,combineReducers} from 'redux'
import productsReducer from './reducers/products';
// import { createStackNavigator } from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native'
import ShopNavigator from './navigation/ShopNavigator'
import cartReducer from './reducers/cart';
import orderReducer from './reducers/order'



// const Stack = createStackNavigator();


const rootReducer = combineReducers({
  products:productsReducer,
  cart:cartReducer,
  orders:orderReducer
})

const store = createStore(rootReducer)



export default function App () {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
   
  );
}

// export function Navigation() {
//   return (
//     <Provider store={store}>
//   <NavigationContainer>
//     <Stack.Navigator>
//       <Stack.Screen name="ProductOverview" component={ProductOverviewScreen} />
//     </Stack.Navigator>
//   </NavigationContainer>
//   </Provider>
//   )
// }

