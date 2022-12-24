import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import NewPostScreen from './Screens/NewPostScreen';
import {SignedInStack, SignedOutStack} from './Screens/Navigation';
import AuthNavigation from './AuthNavigation';
//import AuthNavigation from './AuthNavigation';



export default function App() {
  return <AuthNavigation/>
}

