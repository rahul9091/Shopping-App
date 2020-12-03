import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const CartItem = (props) => {
    return (
        <View style={styles.CartItem}>
            <View style={styles.itemData}>
            <Text style={styles.quantity}>
                {props.quantity}
            </Text>
            <Text style={styles.title}> 
                {props.title}
            </Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>
                    ${props.amount.toFixed(2)}
                </Text>
                <View>
                {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteItem}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash': 'ios-trash'} size={30} color="red"/>
                    
                </TouchableOpacity>}
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    CartItem:{
        flexDirection:'row',
        backgroundColor:'white',
        padding:10,
        justifyContent:'space-between',
        marginHorizontal:20,
        elevation:10
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center'
    },
    quantity:{
        color:'#888',
        fontSize:16,
        marginRight:5
    },
    title:{
        fontSize:16
    },
    amount:{
        fontSize:16,
        marginRight:5
    },
    deleteButton:{
        marginLeft:20
    }
})

export default CartItem