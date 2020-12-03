import React,{useCallback,useEffect,useReducer} from 'react'
import {View,Text,TextInput,ScrollView, StyleSheet,Alert} from 'react-native'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import {useSelector,useDispatch} from 'react-redux'
import * as productActions from '../../actions/products'


const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE"

const formReducer = (state,action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidity = {
            ...state.inputValidity,
            [action.input] : action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidity){
            updatedFormIsValid = updatedFormIsValid && updatedValidity[key]
        }
        return {
            formIsValid:updatedFormIsValid,
            inputValues:updatedValues,
            inputValidity: updatedValidity
        }
         
    }
    return state;
    
}  

const EditProductScreen = (props) =>{
    const dispatch = useDispatch()
    const prodId = props.navigation.getParam("productId")
    const editedProduct = useSelector(state=> {
        return state.products.userProducts.find(prod=>prod.id === prodId)
    });

    const [formState,dispatchFormState] = useReducer(formReducer,{
        inputValues:{
            title:editedProduct ? editedProduct.title : "",
            imageUrl: editedProduct ?editedProduct.imageUrl : "",
            description: editedProduct ? editedProduct.description: "",
            price: ""
         },
        inputValidity:{
            title: editedProduct ? true : false,
            imageUrl: editedProduct? true : false ,
            description:editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid:false
    })


    // const [title,setTitle] = useState(editedProduct ? editedProduct.title : "")
    // const [titleValid,setTitleValid] = useState(false)
    // const [imageUrl,setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : "")
    // const [price,setPrice] = useState("")
    // const [description,setDescription] = useState(editedProduct ? editedProduct.description : "")

    

    const submitHandler = useCallback(() => {
        if(!formState.formIsValid){
            Alert.alert("Pls Enter the valid Title","Wrong Input",[
                {text:"Okay"}
            ])
            return ;
        }
        if(editedProduct) {
            dispatch(productActions.updateProduct(prodId,formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl))
        }else{
            dispatch(productActions.createProduct(formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl,+formState.inputValues.price,))
        }
        props.navigation.goBack()
    },[dispatch,prodId,formState])

    useEffect(() => {
        props.navigation.setParams({submit:submitHandler})
    },[submitHandler])

    const textChangeHandler = (inputIdentifier,text) => {
        let isValid = false 
        if (text.trim().length > 0) {
            isValid = true
            // setTitleValid(false)
        }else{
            // setTitleValid(true)
        }
        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value:text,
            isValid:isValid,
            input:inputIdentifier
        })
        // setTitle(text)
    }
    

    return(
        <ScrollView>
            <View style={{margin:20}}>
            <View style={Styles.formControl}>
                <Text style={Styles.label}>Title</Text>
                <TextInput placeholder="Enter The Title" value={formState.inputValues.title} onChangeText={textChangeHandler.bind(this,'title')} style={Styles.input} keyboardType='default' autoCapitalize="sentences" autoCorrect returnKeyType="next" onEndEditing={()=> console.log("onEndEditing")} onSubmitEditing={() => console.log("onSubmitEditing")} on/>
            </View>
            {!formState.inputValidity.title && <Text>Please Enter the Valid title</Text>}
            <View style={Styles.formControl}>
                <Text style={Styles.label}>ImageUrl</Text>
                <TextInput style={Styles.input} value={formState.inputValues.imageUrl} onChangeText={textChangeHandler.bind(this,'imageUrl')} placeholder="Enter The ImageUrl"/>
            </View>
                { editedProduct ? null :
            <View style={Styles.formControl}>
                <Text style={Styles.label}>Price</Text>
                <TextInput style={Styles.input} value={formState.inputValues.price} onChangeText={textChangeHandler.bind(this, 'price')} placeholder="Enter The Price" keyboardType='number-pad'/>
            </View>
                }
            <View style={Styles.formControl}>
                <Text style={Styles.label}>Description</Text>
                <TextInput style={Styles.input} value={formState.inputValues.description} onChangeText={textChangeHandler.bind(this, 'description')} placeholder="Enter The Description"/>
            </View>
          
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = (navData) => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam("productId") ? "Edit Product" : "Add Product",
        headerRight:() =><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-checkmark' : "ios-checkmark"}
        onPress={submitFn}
        />
        </HeaderButtons>
    }
}


const Styles=StyleSheet.create({
    formControl:{
        width:'100%'
    },
    label:{
        fontSize:18,
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:2,
        textAlign:'center',
        fontSize:20
    }
})

export default EditProductScreen