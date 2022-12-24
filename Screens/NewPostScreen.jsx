import { SafeAreaView } from 'react-native'
import AddNewPost from '../components/NewPost/AddNewPost'

const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1}}>
        <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  )
}

export default NewPostScreen