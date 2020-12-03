import React,{useState} from 'react'
import {Text,View,Button,StyleSheet} from 'react-native'
import Colors from '../../constants/Color'
import CartItem from './CartItem';

const OrderItem = (props) => {
    const [showDetails,setShowDetails] = useState(false)
    return (
    <View style={styles.orderItem}>
        <View style={styles.summary}>
    <Text style={styles.totalAmount}>TotalAmount ${props.totalAmount.toFixed(2)}</Text>
    <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button color={Colors.primary} title={showDetails ? "Hide Details ": "Show Details"} 
        onPress={() => {
            setShowDetails(prevState=> !prevState)
        }}/>
        {showDetails && <View style={{marginBottom:10,width:'100%'}}>
            {props.items.map(Cartitem=> <CartItem key={Cartitem.productId}  quantity={Cartitem.quantity} amount={Cartitem.sum} title={Cartitem.productTitle}/>)}
            </View>}
    </View>
    )
};

const styles=StyleSheet.create({
    orderItem:{
        backgroundColor:'white',
        borderRadius:10,
        margin:10,
        elevation:10,
        padding:10
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    totalAmount:{
        fontSize:16,
    },
    date:{
        fontSize:16,
        color:'#888'
    }
})

export default OrderItem;