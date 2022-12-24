import { View, Text, TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Button, Divider, Image } from 'react-native-elements'
import validUrl from 'valid-url'
import {db,firebase} from '../../firebase'


const PLACEHOLDER_IMG=()=>(
    <View></View>
)

 const uploadPostSchema=yup.object().shape({
    imageUrl:yup.string().url().required('A URL IS NEEDED'),
     caption:yup.string().max(2200, 'Caption has reach the maximum limit')
})


const FormicUploader = ({navigation}) => {
    const [thumbNailUrl, setThumbNailUrl]=useState(PLACEHOLDER_IMG)
    const [currentLoggedinUser,setCurrentLoggedinUser]=useState(null)
    const getUsername=()=>{
      const user =firebase.auth().currentUser
      const unsubscribe=db.collection('users').where('owner_uid','==' ,user.uid).limit(1).onSnapshot(
        snapshot=>snapshot.docs.map(doc=>{
          setCurrentLoggedinUser({
            username:doc.data().username,
            profilePicture:doc.data().profile_picture
          })
        })
      )
      return unsubscribe
    }

useEffect(()=>{
  getUsername()
},[])

const uploadPostToFireBase=(imageUrl,caption)=>{
  const unsubscribe=db.collection('users')
  .doc(firebase.auth().currentUser.email)
  .collection('posts')
  .add({
    imageUrl:imageUrl,
    user:currentLoggedinUser.username,
    profile_picture:currentLoggedinUser.profilePicture,
    owner_uid:firebase.auth().currentUser.uid,
    owner_email:firebase.auth().currentUser.email,
    caption:caption,
    createdAt:firebase.firestore.FieldValue.serverTimestamp(),
    likes_by_users:[],
    comments:[]
  })
  .then(()=>navigation.navigate('HomeScreen'))

return unsubscribe
}

  return (
    <View>
      <Formik
      initialValues={{caption:'', imageUrl:''}}
      onSubmit={((values)=>{
        uploadPostToFireBase(values.imageUrl,values.caption)

      }
      )}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
      >
        {({handleBlur,handleChange,handleSubmit,values,errors,isValid})=>
        <>
        <View style={{margin:20,flexDirection:'row',justifyContent:'space-between'}}>
            <Image source={{uri:`${thumbNailUrl? thumbNailUrl:PLACEHOLDER_IMG }`}}
            style={{width:100,height:100}}
            />
            <View style={{flex:1, marginLeft:22}}>
        <TextInput 
        placeholder='write a caption...' 
        multiline={true}
        style={{fontSize:20}}
        onChangeText={handleChange('caption')}
        value={values.caption}
        onBlur={handleBlur('caption')}
        />
        </View>
      
        </View>
        <Divider width={0.2} orientation="vertical"/>
        <TextInput 
        onChange={(e)=>setThumbNailUrl(e.nativeEvent.text)}
        placeholder='Enter an image url'
        onChangeText={handleChange('imageUrl')}
        onBlur={handleBlur('imageUrl')}
        style={{fontSize:18}}
        value={values.imageUrl}
         />
         {errors.imageUrl && (
            <Text style={{fontSize:10, color:'red'}}>{errors.imageUrl}</Text>
        
         )}
         <Button 
         onPress={handleSubmit} 
         title="Share"
          disabled={!isValid}
          />
        </>
        }
        </Formik>
    </View>
  )
}

export default FormicUploader