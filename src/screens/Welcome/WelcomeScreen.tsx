import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const items1 = [
    {
      img1: require('../../../assets/img/r1/img1.png'),
      img2: require('../../../assets/img/r1/img2.png'),
      img3: require('../../../assets/img/r1/img1.png'),
      title: 'Lorem ipsum 2'
    },
    {
      img1: require('../../../assets/img/r2/img.png'),
      img2: require('../../../assets/img/r2/img2.png'),
      img3: require('../../../assets/img/r2/img1.png'),
      title: 'Lorem ipsum 2'
    },
    {
      img1: require('../../../assets/img/r3/img.png'),
      img2: require('../../../assets/img/r3/img2.png'),
      img3: require('../../../assets/img/r3/img1.png'),
      title: 'Lorem ipsum 2'
    },
  ];
  const items2 = [
    {
      img1: require('../../../assets/img/l1/img1.png'),
      img2: require('../../../assets/img/l1/img2.png'),
      img3: require('../../../assets/img/l1/img1.png'),
      title: 'Lorem ipsum 2'
    },
    {
      img1: require('../../../assets/img/l2/img.png'),
      img2: require('../../../assets/img/l2/img2.png'),
      img3: require('../../../assets/img/l2/img1.png'),
      title: 'Lorem ipsum 2'
    },

  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <View style={styles.table}>
          <View style={styles.rigthRow}>
            <View style={[styles.item1, { backgroundColor: '#FA8A34' }]}>
              <Image style={{ width:61 , height: 80 }} source={require('../../../assets/img/vector.png')} />
            </View>

            {items2.map((el, index) => (
              <View key={index} style={styles.item1}>
                <View style={styles.img}>
                  <Image source={el.img1} style={[styles.image1,]} />
                  <Image source={el.img2} style={[styles.image, { position: 'absolute', zIndex: 1 }]} />
                  <Image source={el.img3} style={[styles.image1,]} />
                </View>
                <Text>{el.title}</Text>
              </View>
            ))}
          </View>
          <View style={styles.leftRow}>

            {items1.map((el, index) => (
              <View key={index} style={styles.item1}>
                <View style={styles.img}>
                  <Image source={el.img1} style={[styles.image1,]} />
                  <Image source={el.img2} style={[styles.image, { position: 'absolute', zIndex: 1 }]} />
                  <Image source={el.img3} style={[styles.image1,]} />
                </View>
                <Text>{el.title}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnLine} onPress={() => navigation.navigate("Login")}>
            <Text style={{ textAlign: 'center', color: '#FA8A34' }}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Registr")}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  btn: {
    backgroundColor: '#FA8A34',
    padding: 15,
    alignItems: 'center',
    borderRadius: 16,
    margin: 16,
  },
  btnLine: {
    margin: 10,
  },
  item1: {
    width: 180,
    height: 136,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  image1: {
    width: 50,
    height: 50,
    marginHorizontal: 12,
    zIndex: 0
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 0,
  },
  img: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  leftRow: {
    padding: 8,
    marginTop: 60
  },
  rigthRow: {
    padding: 8,

  },
  table: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  }
});

export default WelcomeScreen;
