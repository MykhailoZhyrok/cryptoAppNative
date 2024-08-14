import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../../postSlice/postsSlice';
import { RootState } from '../../../store/store'; // Adjust path as per your Redux store setup
import { useNavigation } from '@react-navigation/native';

type PostScreenProps = {
  route: {
    params: {
      post: {
        id: number;
        title: string;
     
      };
    };
  };
};

const PostScreen: React.FC<PostScreenProps> = ({ route }) => {
  const { post } = route.params;
  const comments = useSelector((state: RootState) => state.posts.comments);
  const dispatch = useDispatch();
  const navigation = useNavigation()
  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, [dispatch, post.id]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>{post.title}</Text>
            <Image style={styles.postImage} source={require('../../../../assets/img/post.png')} />
          </View>
          <View style={styles.postCard}>
            <Text style={styles.postTitle}>How to take shower?</Text>
            <Text style={styles.postContent}>The weather outside is lovely today, isn't it? I can't wait to take a stroll through the park.</Text>
          </View>
          {comments && comments.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <Text style={styles.commentTitle}>{comment.name}</Text>
              <Text>{comment.body}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonBox}>
      <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={styles.buttonContainer} >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    color: '#06070A',
    marginBottom: 20,
    marginTop: 20,
  },
  postCard: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContent: {
    color: '#888',
    marginTop: 10,
  },
  postImage: {
    width: '100%', // Adjusted to take full width
    height: 200, // Added height for better visibility
    resizeMode: 'cover', // Adjust image resizing
  },
  commentContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    backgroundColor: '#FA8A34',
    padding: 15,
    alignItems: 'center',
    borderRadius: 16,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonBox:{
    backgroundColor: '#fff',
    paddingBottom: 15
  }
});

export default PostScreen;
