import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import Post from '../components/Home/Post';
import { POSTS } from '../Data/Posts';
import {db} from '../firebase'
import React,{useEffect,useState} from 'react'
import Header from '../components/Home/Header';
import Stories from '../components/Home/Stories';
import { bottomTabIcons, BottomTabs } from '../components/Home/BottomIcons';


const HomeScreen = ({navigation}) => {
  const [posts,setPosts]=useState([])
useEffect(()=>{
  db.collectionGroup('posts').onSnapshot(snapshot =>{
    setPosts(snapshot.docs.map(post=>(
      {id:post.id, ...post.data()})))
  })
},[])
  return (
 <View style={styles.container}>
   <Header navigation={navigation}/>
   <Stories/>
   <FlatList 
   data={posts}
  renderItem={({item})=>(
    <Post post={item} /> 
  )}
   />
   
<BottomTabs icons={bottomTabIcons}/>
</View>
    
    
  )
}

const styles =StyleSheet.create({
container:{
 flex:1,

  
 },



})

export default HomeScreen