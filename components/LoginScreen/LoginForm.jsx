import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { TextInput,Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableOpacity ,Alert} from 'react-native'
import { Formik } from 'formik'
import Validator from 'email-validator'
import {firebase, db} from '../../firebase'
//import { auth } from './firebase'
import * as Yup from 'yup';


const LoginForm = ({navigation}) => {
    const LoginFormSchema=Yup.object().shape({
        email:Yup.string().email().required('An email is required'),
        password:Yup.string()
        .required()
        .min(6, 'your password has to be atleast 6 characters')
    })

const onLogin= async(email,password)=>{
  try{
    await firebase.auth().signInWithEmailAndPassword(email,password)
    console.log('firebase login successful🔥',email,password)
  }
  catch(error){
    Alert.alert('Boss...',
    error.message + '\n\n ....what would you like to do next?',
    [
      {
        text:'OK',
        onPress:()=>console.log('ok'),
        style:'cancel'
      },
      {
        text:'Sign up',
        onPress:()=>navigation.navigate('SignupScreen'),
        
      }
    ]
    )
  }
    }
  return (
    <View style={styles.wrapper}>
        <Formik
        initialValues={{email:'',password:''}}
        onSubmit={values=>{
            onLogin(values.email,values.password)
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
        > 
        {({handleChange,handleBlur,handleSubmit,values,isValid})=>(
            <>
           <View style={[styles.input, {
            borderColor:values.email.length < 1 || Validator.validate(values.email) ? '#ccc' :'red'
           }]}>
           <TextInput 
           placeholderTextColor='#444'
           placeholder='Phone number, username or email'
           keyboardType='email-address'
           textContentType='emailAdress'
           autoFocus={true}
           autoCapitalize='none'
           onChangeText={handleChange('email')}
           onBlur={handleBlur('email')}
           value={values.email}
           />
           </View>
           <View style={[styles.input,{
            borderColor:1 > values.password.length || values.password.length >= 8 ?'#ccc' :'red'
           }]}>
           <TextInput
           placeholder='Password'
           placeholderTextColor='#444'
           autoCorrect={false}
           secureTextEntry={true}
           textContentType='password'
           autoCapitalize='none'
           onChangeText={handleChange('password')}
           onBlur={handleBlur('password')}
           value={values.password}
           />
           </View>
           <View style={{alignItems:'flex-end',marginBottom:30,}}>
             <Text style={{color:'#6BB0F5'}}>Forgot password?</Text>
           </View>
          
           <Pressable style={styles.button(isValid)}
            titleSize={20} onPress={handleSubmit}
            disabled={!isValid}
            >
             <Text style={styles.text} >Log in</Text>
           </Pressable>
           <View  style={styles.signUp}>
             <Text>Dont have an account yet?</Text>
             <TouchableOpacity onPress={()=>navigation.navigate('SignupScreen')}>
                 <Text style={{color:'#6BB0f5'}}> Sign Up</Text>
             </TouchableOpacity>
           </View>
           </>
        
        )}
         </Formik>
    </View>
  )
}


const styles=StyleSheet.create({
    input:{
        borderRadius:4,
        padding:8,
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:1
},
wrapper:{
    marginTop:80
},
button:isValid=>({
    backgroundColor:isValid? '#0096F6' :'#9ACAF7',
    minHeight:42,
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center'
     
}),
text:{
    fontWeight:'medium',
    color:'#fff',
    fontSize:20
},
signUp:{
flexDirection:"row",
width:'100%',
justifyContent:'center',
marginTop:50
}
})

export default LoginForm