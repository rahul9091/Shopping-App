import React from 'react';
import {View,Text,Image,StyleSheet, Button,TouchableOpacity,TouchableNativeFeedback,Platform, Alert} from 'react-native'

import Color from '../../constants/Color'



const ProductItem = (props) => {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21 ){
        TouchableCmp= TouchableNativeFeedback;
    }
    return (
        
        <View style={styles.product}>
            <TouchableCmp onPress={props.onViewDetail} useForeground>
                <View>
            <Image style={styles.image} source={{uri:props.image}}/>
            <View style={{alignItems:'center'}}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                <Text style={styles.price}>{props.description}</Text>
            </View>
    
            <View style={styles.actions}>
              {props.children}
            </View>
            </View>
            </TouchableCmp>
        </View>
     
    )
}

const styles=StyleSheet.create({
    product:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        elevation:5,
        backgroundColor:'white',
        borderRadius:10,
        height:300,
        margin:10
    },
    image:{
        width:'100%',
        height:'60%'
  },
  title:{
      fontSize:18,
      marginVertical:2
  },
  price:{
      fontSize:14,
      color:'#888'
  },
  actions:{
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      marginTop:5
  }
})

export default ProductItem;