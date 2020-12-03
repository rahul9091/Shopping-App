import React from 'react';
import {FlatList,Platform,Text,View,Button} from 'react-native'
import { useSelector , useDispatch} from 'react-redux'
// import Header from '../../components/header';
import ProductItem from '../../components/shop/ProductItem'
// import ProductDetailScreen from '../../screens/shop/ProductDetailScreen';
import * as cartActions from '../../actions/cart'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Color'




const ProductOverviewScreen = (props) => {


    const dispatch = useDispatch()
    const products = useSelector(state=>{
        return state.products.availabelProducts
    })

    const selectItemHandler = (id,title) => {
        props.navigation.navigate('ProductsDetail',{productId:id,productTitle:title})
    }

    return (
        <View style={{flex:1}}>
        <FlatList 
        data={products}
        renderItem={({item})=>{
            return (
        <ProductItem
        image={item.imageUrl}
        title={item.title}
        price={item.price}
        onSelect={() => {
           selectItemHandler(item.id,item.title)
        }}
        // onAddToCart={() => {
          
        // }}
        >
              <Button  color='red' title="View Details" onPress={()=>{
                  selectItemHandler(item.id,item.title)
              }}/>
                <Button color="red" title=" Add To Cart" onPress={()=>{
                      dispatch(cartActions.addToCart(item));
                }}/> 
        </ProductItem>
            )
        }}
        keyExtractor={item=>item.id}
        />
        </View>
    )
}
ProductOverviewScreen.navigationOptions = (navData) => {
    return {
    headerTitle:"All Productssss ",
    headerLeft:() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : "ios-menu"}
    onPress={() => {
        navData.navigation.toggleDrawer()
    }}
    />
    </HeaderButtons>
    ,
    headerRight:() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="cart" iconName={Platform.OS === 'android' ? 'md-cart' : "ios-cart"}
        onPress={() => {
            navData.navigation.navigate('Cart')
        }}
        />
    </HeaderButtons>
    }
}

export default ProductOverviewScreen;