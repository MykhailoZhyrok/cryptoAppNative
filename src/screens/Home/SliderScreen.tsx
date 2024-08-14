import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

interface SliderItem {
  index: number;
  title: string;
  steps: number;
  nameIcon: string;
  color: string;
  colorIc: string;
}

const SliderScreen: React.FC = () => {
  let data: SliderItem[] = [
    {
      index: 1,
      title: 'Link your bank Account',
      steps: 2,
      nameIcon: 'link-2',
      color: '#636363',
      colorIc: '#fff',
    },
    {
      index: 2,
      title: 'Add funds to your wallet',
      steps: 3,
      nameIcon: 'link-2',
      color: '#EE6363',
      colorIc: '#00A385',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.index} style={[styles.taskBox, { backgroundColor: item.color }]}>
            <View style={styles.containerSide}>
              <View style={styles.iconContainer}>
                <Icon1 name={item.nameIcon} style={[styles.icon, { color: item.colorIc }]} />
              </View>
              <Text style={[styles.title, { color: item.index === 1 ? item.colorIc : 'black' }]}>{item.title}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.steps, { color: item.index === 1 ? item.colorIc : '#606773' }]}>Steps: {item.steps}</Text>
              <Icon2 name='arrowright' style={[styles.stepsIcon, { color: item.index === 1 ? item.colorIc : '#606773' }]} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  taskBox: {
    width: 243,
    height: 152,
    borderRadius: 16,
    padding: 16,
    marginLeft: 15,
  },
  iconContainer: {
    marginBottom: 10,
    width: 48,
    height: 48,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA8A34',
  },
  icon: {
    fontSize: 24,
    color: '#000',
    position: 'absolute',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    marginBottom: 5,
    width: 133,
    lineHeight: 24,
    paddingLeft: 12,
  },
  steps: {
    fontSize: 15,
    color: '#6c757d',
  },
  stepsIcon: {
    fontSize: 25,
    fontWeight: '100',
  },
  containerSide: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 30,
  },
});

export default SliderScreen;
