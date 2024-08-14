import {
  Text, View, SafeAreaView,
  StyleSheet, StatusBar, TouchableOpacity,
  ScrollView
} from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SliderScreen from './SliderScreen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../postSlice/postsSlice';
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import * as Keychain from 'react-native-keychain';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const posts = useSelector((state: any) => state.posts);
  const user = useSelector((state: any) => state.user);
  const getFromKeyChain = async() =>{
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.pin
        );
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  }
  
  useEffect(() => {
    dispatch(fetchPosts());
    getFromKeyChain()
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
      <View style={styles.innerShadow}>
        <View style={styles.header}>
          <View style={styles.centeredContent}>
            <Text style={styles.value}>Your Name</Text>
            <Text style={styles.label}>{user && <Text>{user.user.username}</Text>}</Text>
          </View>
          </View>
        </View>
      </View >

      <View style={styles.containerBox}>
        <View style={styles.containerTask}>
          <View style={styles.taskBox}>
            <View style={styles.content}>
              <View style={styles.taskText}>
                <Text style={{lineHeight:18.15, fontSize: 15, color: '#06070A', marginBottom: 5}}>Test task</Text>
                <Text style={styles.mainText}>Lorem ipsum</Text>
        
                <TouchableOpacity onPress={() => console.log('Go to call')} style={styles.call}>
                  <Text style={styles.callText}>Go to call</Text>
                  <Icon1 style={styles.callText} name='right'/>
                </TouchableOpacity>
               
              </View>
              <View style={styles.bg}></View>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.sliderBox}>
            <Text style={[styles.mainText, { paddingTop: 16, paddingBottom: 10, paddingLeft: 16}]}>Before you start</Text>
            <SliderScreen />

            <View>

            </View>
            <View style={styles.postsContainer}>
              <Text style={[styles.mainText, { paddingTop: 16, paddingBottom: 10}]}>Posts</Text>
              <View style={styles.containerBox}>
                {posts && posts.posts.map((post, index) => (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('Post', { post })} style={styles.taskBox}>
                    <View style={{padding:16}}>
                      <Text style={{ fontSize: 16, marginBottom: 8, lineHeight:21.78, color: '#171718' }}>{post.title}</Text>
                      <Text style={{textAlign: 'justify', lineHeight:19.36, color: '#414141'}}>{post.body.slice(0, 160)}</Text>
                    </View>
                  </TouchableOpacity>
                ))}</View>
            </View>
          </View>
        </View>
      </View>
        
    </ScrollView>
    
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F5',
  },
  headerContainer: {
    height: 300,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    overflow: 'hidden', // Важливо для відсічення зайвого частини BlurView
    
  },
  innerShadow: {
    flex: 1,
    backgroundColor: '#FA8A34',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 20,
    },},
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Важливо для накладання тексту над BlurView
  },
  centeredContent: {
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  value: {
    fontSize: 18,
    color: '#fff',
  },
  containerBox: {
    alignItems: 'center',

  },
  taskBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bg: {
    width: 127,
    height: 127,
    padding: 10,
    backgroundColor: '#006174',
    borderRadius: 13,
  },
  containerTask: {
    paddingHorizontal: 16,
    width: '100%',
    
  },
  sliderBox: {

  },
  postsContainer:{
    marginTop: 26,
    paddingHorizontal: 16,
  },
  mainText:{
    color: '#606773',
    fontSize: 16,
  },
  taskText:{
    paddingLeft: 20
  },
  call:{
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  callText:{
    color: '#009E81',
    lineHeight: 24,
    fontSize: 18
  }
});


export default HomeScreen;