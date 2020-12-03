import React from 'react';
import {View,Text,Image,StyleSheet,ScrollView, Button} from 'react-native'
import { useSelector,useDispatch } from 'react-redux';
import Product from '../../models/product';
import Colors from '../../constants/Color';
import * as cartActions from '../../actions/cart';




const ProductDetailScreen = (props) => {
    const dispatch = useDispatch()
    const productId = props.navigation.getParam("productId")

    const selectedProduct = useSelector(state=>{
        return state.products.availabelProducts.find(prod=>prod.id === productId)
    })
    
   
    return(
      <ScrollView>
          <Image style={{width:'100%',height:300}}  source={{uri:selectedProduct.imageUrl}}/>
          <View style={{marginVertical:10,alignItems:'center'}}>
          <Button color={Colors.primary} title="Add to Cart" onPress={() =>{
            dispatch(cartActions.addToCart(selectedProduct))
          }}/>
          </View>
          <Text style={{fontSize:20,color:'#888',textAlign:'center'}}>
            ${selectedProduct.price.toFixed(2)}
          </Text>
          <Text style={{fontSize:14,marginHorizontal:40,marginTop:20,textAlign:'center'}}>
            {selectedProduct.description}
          </Text>
      </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData =>{
    return{
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

export default ProductDetailScreen