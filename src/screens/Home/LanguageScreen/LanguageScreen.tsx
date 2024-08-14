import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';

const LanguageScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>('English');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
        <Icon1 name='left' style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.containerMain}>
        <Text style={{ color: '#06070A', fontWeight: '600', fontSize: 22, paddingBottom: 18 }}>Language</Text>
        <TouchableOpacity style={styles.userCont} onPress={() => setSelectedLanguage('English')}>
          <Icon2 name='globe' style={styles.otherSett} />
          <Text style={styles.settingsText}>English</Text>
          {selectedLanguage === 'English' && (
            <Icon1 name='checkcircle' style={styles.checkIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.userCont} onPress={() => setSelectedLanguage('Arabic')}>
          <Icon2 name='globe' style={styles.otherSett} />
          <Text style={styles.settingsText}>Arabic</Text>
          {selectedLanguage === 'Arabic' && (
            <Icon1 name='checkcircle' style={styles.checkIcon} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    marginBottom: 16,
    borderRadius: 16,
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
  checkIcon: {
    fontSize: 24,
    color: '#FA8A34',
    marginLeft: 'auto',
  },
});

export default LanguageScreen;
