import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store'; // Update with your actual store structure
import { logoutUser } from '../../authSlice/authSlice';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user); // Adjust RootState based on your store structure

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
        <Icon1 name='left' style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.containerMain}>
        <Text style={{ color: '#06070A', fontWeight: '600', fontSize: 22, paddingBottom: 18 }}>Settings</Text>
        <TouchableOpacity style={styles.userCont}>
          <View style={styles.userIcon}>
            {user && user.user.image ? (
              <Image source={{ uri: user.user.image }} style={styles.image} />
            ) : null}
          </View>
          <Text style={styles.settingsText}>{user?user.user.username:''}</Text>
        </TouchableOpacity>
        <Text style={styles.textOpt}>Basic</Text>
        <TouchableOpacity style={styles.userCont} onPress={() => navigation.navigate("Language")}>
          <Icon2 name='globe' style={styles.otherSett} />
          <Text style={styles.settingsText}>Language</Text>
        </TouchableOpacity>
        <Text style={styles.textOpt}>Others</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Welcome');
          dispatch(logoutUser());
        }} style={styles.userCont}>
          <Icon2 name='log-out' style={styles.otherSett} />
          <Text style={styles.settingsText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnBack: {
    marginLeft: 10,
    padding: 20,
  },
  backIcon: {
    position: 'absolute',
    fontSize: 24,
    color: '#06070A',
  },
  containerMain: {
    paddingHorizontal: 16,
  },
  userCont: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  userIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#EBEFF5',
    borderWidth: 1,
    borderColor: '#E9F7F2',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherSett: {
    fontSize: 24,
    color: '#FA8A34',
  },
  textOpt: {
    color: '#606773',
    fontSize: 15,
    paddingTop: 32,
    paddingBottom: 8,
  },
  settingsText: {
    color: '#06070A',
    fontSize: 15,
    paddingLeft: 10,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
});

export default ProfileScreen;
