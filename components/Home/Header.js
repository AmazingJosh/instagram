import {SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase } from '../../firebase';

const handleSignOut=async()=>{
    try{
        await firebase.auth().signOut()
        console.log('signed out successfully')
    }
    catch(error){
       console.log(error)
    }
}

const Header = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={handleSignOut}>
    <Image
     source={require('../../assets/logo.png')}
     style={styles.logo}
     />
     </TouchableOpacity>
<View style={styles.iconsContainer}>
    <TouchableOpacity onPress={()=>navigation.navigate('NewPostScreen')}>
    <AntDesign name="plussquareo" style={styles.icon} size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity>
    <FontAwesome name="heart-o" style={styles.icon} size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity>
        <View style={styles.unread}>
            <Text style={styles.unreadbadge}>11</Text>
        </View>
    <FontAwesome5 name="facebook-messenger" style={styles.icon} size={24} color="black" />
    </TouchableOpacity>
</View>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
    container:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginHorizontal:5,
    marginTop:25
    
    },
unread:{
backgroundColor:"red",
position:'absolute',
left:20,
bottom:28,
width:25,
height:18,
borderRadius:25,
alignItems:'center',
justifyContent:'center',
zIndex:100
},
unreadbadge:{
    color:'white',
    fontWeight:'500'

}

,

    icon:{
        width:30,
        height:30,
        margin:10,
        resizeMode:"contain"
    },
    iconsContainer:{
        flexDirection:'row'


    },
    logo:{
width:100,
height:50,
resizeMode:'contain'
    }
})

export default Header