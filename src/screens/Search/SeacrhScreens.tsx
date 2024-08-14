import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; // Update with your actual store structure

const SearchScreen: React.FC = () => {
  const [text, setText] = useState<string>('');
  const posts = useSelector((state: RootState) => state.posts.posts);
  const navigation = useNavigation();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Search</Text>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Icon name='search1' style={styles.icon} />
          </View>
          <TextInput
            placeholderTextColor="#606773"
            placeholder='Search Products...'
            style={styles.searchInput}
            onChangeText={(text) => setText(text)}
            value={text}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.containerBox}>
          {filteredPosts.map((post, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Post', { post })} style={styles.taskBox}>
              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 16, marginBottom: 8, lineHeight: 21.78, color: '#171718' }}>ID: {post.id}</Text>
                <Text style={{ textAlign: 'justify', lineHeight: 19.36, color: '#414141' }}>Name: {post.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 22,
    paddingVertical: 15,
  },
  containerBox: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  taskBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    fontSize: 20,
    color: '#606773',
  },
  searchInput: {
    height: '100%',
    fontSize: 16,
    flex: 1,
  },
});

export default SearchScreen;
