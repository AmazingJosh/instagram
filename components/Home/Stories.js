import React from 'react';
import { View,Text,StyleSheet, ScrollView ,Image} from 'react-native';
import { USERS } from '../../Data/Users';


const Stories=()=>{
    return(
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            {USERS.map((story,i)=>(
                <View key={i}>
                    <Image style={styles.image} source={{uri:story.imageUrl}}/>
                    {story.name.length <=6?<Text style={styles.name}>{story.name}</Text>:<Text style={styles.name}>{story.name.slice(0,5) +'...'}</Text>}
                </View>
            ))}

            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
container:{
marginBottom:13
},
image:{
width:70,
height:70,
borderRadius:50,
marginLeft:7,
borderWidth:3,
borderColor:'#ff8501'
},

name:{
    marginLeft:16,
    alignItems:'center'
}

})

export default Stories;