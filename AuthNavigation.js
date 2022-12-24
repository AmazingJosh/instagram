
import React,{useEffect,useState} from 'react'
import { firebase } from './firebase'
import { SignedInStack, SignedOutStack } from './Screens/Navigation'

const AuthNavigation = () => {
    const [currentUser,setCurrentUser]=useState(null)
    const useHandler=user=>
    user? setCurrentUser(user) : setCurrentUser(null)
    useEffect(
        ()=>firebase.auth().onAuthStateChanged(user=>useHandler(user)),
        []
    )
  return <>{currentUser? <SignedInStack/> : <SignedOutStack/>}</>
    
  }

export default AuthNavigation