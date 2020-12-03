import React from 'react'
import {FlatList,Platform, View,Button,Alert} from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import {useSelector,useDispatch} from 'react-redux'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Color'
import * as productActions from '../../actions/products'
import EditProductScreen from '../user/EditProductScreen'

const UserProductScreen = (props) => {

    const deleteHandler =(id) => {
        Alert.alert("Are You Sure","Do you really want to delete",[
            {text:'No',style:'default'},
            {text:'yes',style:'destructive',onPress:()=>{
                dispatch(productActions.deleteProduct(id))
            }}
        ])
    }

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct',{productId:id})
        }
    
    const dispatch = useDispatch()

    const userProducts = useSelector(state=>{
        return state.products.userProducts

      
    
    })
    return (
     <View style={{flex:1}}>
    <FlatList 
    data={userProducts}
    keyExtractor={item=>item.id}
    renderItem={({item})=> {
        return ( <ProductItem
        imageUrl={item.imageUrl}
        title={item.title}
        price={item.price}
        image={item.imageUrl}
        onSelect={() =>{
            editProductHandler(item.id)
        }}
        >
            <Button  color='red' title="Edit" onPress={()=>{
                editProductHandler(item.id)
              }}/>
                <Button color="red" title=" Delete" onPress={deleteHandler.bind(this, item.id)}/>
                {/* {() => {deleteHandler(item.id)}} */}
        </ProductItem>
        )
    }}
    />
    </View>
    )
}

UserProductScreen.navigationOptions = (navData) =>  {
    return {
        headerTitle:'Your Product',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : "ios-menu"}
        onPress={() => {
            navData.navigation.toggleDrawer()
        }}
        />
        </HeaderButtons>,
        headerRight:() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Add" iconName={Platform.OS === 'android' ? 'md-create' : "ios-create"}
        onPress={() => {
            navData.navigation.navigate("EditProduct")
        }}
        />
        </HeaderButtons>
        
    }
}

export default UserProductScreen;