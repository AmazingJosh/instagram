import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import SignupForm from '../components/SignupScreen/SignupForm'

const SignupScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image style={{width:100 ,height:100}} source={{uri:'https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266__340.jpg'}}/>
    </View>
    <SignupForm navigation={navigation}/>

    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    paddingTop:50,
    paddingHorizontal:12
    
      },
       logoContainer:{
    alignItems:'center',
    marginTop:60

  },
})