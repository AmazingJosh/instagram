import { View, Text,TextInput,Pressable,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Validator from 'email-validator'
import { Alert } from 'react-native'
import {firebase,db,auth} from '../../firebase'

const SignupForm = ({navigation}) => {
    const SignupSchema=yup.object().shape({
        email:yup.string().email().required('An email is required'),
        username:yup.string().required().min(2,'A username is required'),
        password:yup.string().required().min(6, 'You Password must have atleast 6 characters')
    }) 
const getRandomProfile = async () => {
const response=await fetch('https://randomuser.me/api')
const data=await response.json()
return data.results[0].picture.large
}

const onSignup = async(email,password,username)=>{
try{
    const authUser =await firebase.auth().createUserWithEmailAndPassword(email,password)
    db.collection('users').doc(authUser.user.email).set({
        owner_uid:authUser.user.uid,
        username:username,
        email:authUser.user.email,
        profile_picture:await getRandomProfile(),
    })
    console.log('User created successfully✔🔥')
    }
catch(error){
    console.log("my lord there's an error", error.message)
}
}   


  return (
    <View style={styles.wrapper}>
    <Formik
    initialValues={{email:'',username:'',password:''}}
    onSubmit={values=>{
        onSignup(values.email,values.password,values.username)
    }}
    validationSchema={SignupSchema}
    validateOnMount={true}
    > 
    {({handleChange,handleBlur,handleSubmit,values,isValid})=>(
        <>
       <View style={[styles.input, {
        borderColor:values.email.length < 1 || Validator.validate(values.email) ? '#ccc' :'red'
       }]}>
       <TextInput 
       placeholderTextColor='#444'
       placeholder='Email'
       keyboardType='email-address'
       textContentType='emailAdress'
       autoFocus={true}
       autoCapitalize='none'
       onChangeText={handleChange('email')}
       onBlur={handleBlur('email')}
       value={values.email}
       />
       </View>
       <View style={[styles.input, {
        borderColor:1 > values.password.length || values.password.length >= 6 ?'#ccc' :'red'
       }]}>
       <TextInput 
       placeholderTextColor='#444'
       placeholder='Username'
       textContentType='username'
       onChangeText={handleChange('username')}
       onBlur={handleBlur('username')}
       value={values.username}
       />
       </View>
       <View style={[styles.input,{
        borderColor:1 > values.password.length || values.password.length >= 6 ?'#ccc' :'red'
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
       
      
       <Pressable style={styles.button(isValid)}
        titleSize={20} onPress={handleSubmit}
        disabled={!isValid}
        >
         <Text style={styles.text} >Sign up</Text>
       </Pressable>
       <View style={styles.signUp}>
         <Text>Already have an account ?</Text>
         <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')}>
             <Text style={{color:'#6BB0f5'}}> log in</Text>
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

export default SignupForm