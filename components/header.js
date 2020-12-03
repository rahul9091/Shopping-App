import React from 'react';
import {Text,View,Image} from 'react-native';
import { FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';
import Constant from 'expo-constants'

const Header = () => {
    return (
        <View style={{width:'100%',padding:10,backgroundColor:'grey',marginTop:Constant.statusBarHeight,flexDirection:'row',justifyContent: 'space-between',}}>
             <View >
             <Image style={{height:50,width:100}} source={{uri:'https://i.pinimg.com/originals/7e/58/12/7e581229a538252d25d892dbb4eb615e.png'}}/>
            </View>  
            <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
                <FontAwesome style={{marginHorizontal:10,marginTop:10}} name="bell-o" size={24} color='black' />
                <MaterialCommunityIcons style={{marginHorizontal:10,marginTop:10}} name="cart" size={24} color="black" />
            </View>
        </View>
    )
}

export default Header;