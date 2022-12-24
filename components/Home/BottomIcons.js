import React,{useState} from 'react';
import { TouchableOpacity,StyleSheet,Image,View } from 'react-native';
import { Divider } from 'react-native-elements';
export const bottomTabIcons=[
    {
        name:'home',
        active:'https://www.nicepng.com/png/detail/937-9379647_png-file-svg-instagram-home-icon-vector.png',
        inactive:'https://cdn-icons-png.flaticon.com/512/5525/5525279.png',

    },
    {
        name:'search',
        active:'https://p.kindpng.com/picc/s/25-254282_search-button-icon-png-transparent-png.png',
        inactive:'https://www.clipartmax.com/png/small/32-321977_lens-clipart-magnifier-search-icon-transparent.png'
    },
    {
        name:'Reels',
        active:'https://img.icons8.com/ios-filled/500/instagram-reel.png',
        inactive:'https://img.icons8.com/ios/500/instagram-reel.png',

    
    },
    {
        name:'shoppingbag',
        active:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrjzBaJRV-O9BauvxREJv_i2_mV5EAiMijFOyGgRSaaprvE-JnJ8ypu7O9VFpglGROXa8&usqp=CAU',
        inactive:'https://cdn.iconscout.com/icon/free/png-256/instagram-shop-4941673-4109073.png'

    },
    {
        name:'profile',
        active:'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        inactive:'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

    }
]

export const BottomTabs=({icons})=>{
    const [active,setActive]=useState('Home')

    const Icon =({icon})=>(
        <TouchableOpacity onPress={()=>setActive(icon.name)}>
            <Image source={{uri:active===icon.name? icon.active:icon.inactive}} 
            style={[styles.icon, icon.name==='profile' ? styles.profilePic:null]} />
        </TouchableOpacity>
    )
    return(
        <View style={styles.wrapper}>
        <Divider width={1}orientation="vertical" />
        <View style={styles.container}>
            {icons.map((icon,i)=>(
                <Icon key={i} icon={icon}/>
            ))}
        </View>
        </View>
    )
}
styles=StyleSheet.create({
icon:{
    width:30,
    height:30

},
container:{
    flexDirection:'row',
    justifyContent:'space-around',
    height:50,
    paddingTop:10
},
wrapper:{
    position:'absolute',
    width:'100%',
    bottom:1,
    zIndex:999,
    backgroundColor:'#fff'

},
profilePic:{
    borderRadius:50,
    borderColor:'#fff'
}

})