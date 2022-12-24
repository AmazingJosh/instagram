import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import Divider from 'react-native-divider'
import { FontAwesome,Feather } from '@expo/vector-icons';
import { db,firebase } from '../../firebase';
import { Ionicons } from '@expo/vector-icons';
const Post = ({post}) => {
  const handleLike=()=>{
    const currentLikeStatus =!post.likes_by_users.includes(firebase.auth().currentUser.email)
    db.collection('users')
    .doc(post.owner_email)
    .collection('posts')
    .doc(post.id)
    .update({
      likes_by_users:currentLikeStatus? firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email): firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
    }).then(()=>{
      console.log('Document successfully uploaded')
    })
    .catch((error)=>{
      console.log('Error uploading the document',error)
    })
     
  }
  return (
    <View style={{}}>
        <Divider width={1} ></Divider>
      <PostHeader post={post} />
   <PostImage post={post}/>
      <PostIcon post={post} handleLike={handleLike}/>
      <PostLikes post={post}/>
      <PostCaption post={post}/>
      <PostComments post={post}/>
      <Comments post={post}/>

    </View>
  )
}

const PostHeader=({post})=>(
<View style={styles.postHeader}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
<Image source={{uri:post.profile_picture}} style={styles.image} />
<Text style={styles.text}>{post.user}</Text>
</View>
<Text style={{fontWeight:'bold'}}>...</Text>
</View>

)

const PostImage=({post})=>(
  <View style={{width:'100%', height:350}}>
    <Image source={{uri:post.imageUrl}}
     style={{resizeMode:'cover', height:'100%'}}/>
     </View>
)

const PostIcon=({handleLike,post})=>(
  <TouchableOpacity style={{flexDirection:'row', marginHorizontal:10,marginTop:10, justifyContent:'space-between'}}>
    <View style={{flexDirection:'row'}}>
   <TouchableOpacity onPress={()=>handleLike(post)}> 
   <Ionicons name="heart-sharp" style={{marginHorizontal:7}} size={28} color="red" />
    {/* <FontAwesome style={{marginHorizontal:7}} name="heart-o"  size={24} color="black" /> */}
   </TouchableOpacity>
<FontAwesome style={{marginHorizontal:7}} name="comment-o" size={24} color="black" />
<Feather style={{marginHorizontal:7}} name="send" size={24} color="black" />
    </View>
<View><Feather name="bookmark" size={24} color="black" /></View>
  </TouchableOpacity>

)
 const PostLikes=({post})=>(
<View style={{marginHorizontal:15, marginTop:10,fontWeight:'bold' }}>
  <Text >{post.likes_by_users.length.toLocaleString('en')} likes</Text>
</View>
)

const PostCaption=({post})=>(
  <View style={{flexDirection:'row', marginHorizontal:15}}>
    <Text style={{fontWeight:'bold'}}>{post.user}</Text>
      <Text>{' '}{post.caption}</Text>
  </View>
)

const PostComments=({post})=>(
  <View style={{marginHorizontal:15,marginTop:5}}>
    {!!post?.comments?.length && <Text style={{color:'grey'}} >{post.comments.length > 1? `view all ${post.comments.length} comments`:`view comment`}</Text>
  }
 </View>
)
const Comments=({post})=>(
  <>
{post?.comments.map((comment,i)=>(
  <View key={i} style={{flexDirection:'row', marginHorizontal:15}}>
    <Text style={{fontWeight:'bold'}}>{comment.user}{' '}</Text>
    <Text>{comment.comment}</Text>
  </View>
))}
  </>
)













export default Post

const styles = StyleSheet.create({
container:{

 
},
postHeader:{
flexDirection:'row',
justifyContent:'space-between',
margin:5,
alignItems:'center'
},
image:{
    width:35,
    height:35,
    borderRadius:50,
    marginLeft:6,
    borderWidth:1.6,
    borderColor:'#ff8501'
    },
    text:{
        marginLeft:5,
        
    
    }
})