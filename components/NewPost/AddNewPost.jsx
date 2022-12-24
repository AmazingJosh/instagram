import { View, Text ,StyleSheet, TouchableOpacity,SafeAreaView, Platform, StatusBar} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import FormicUploader from './FormicUploader'

const AddNewPost = ({navigation}) =>  (
  <View style={styles.container} >
<Header navigation={navigation}/>
<FormicUploader navigation={navigation}/>
</View>
  )


const Header=({navigation})=>{
  return (
    <SafeAreaView style={{paddingTop:Platform.OS==="android"?StatusBar.currentHeight:0}}>
      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
        <AntDesign name="arrowleft" size={30}/>
      </TouchableOpacity>
      <Text style={styles.Headertext}>NEW POST</Text>
      <Text></Text>
      </View>
      
    </SafeAreaView>
  )

}

const styles=StyleSheet.create({
  container:{
    marginHorizontal:10
  },
  headerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  Headertext:{
    fontSize:18,
    marginRight:23,
    fontWeight:'bold'

  }
})

export default AddNewPost