import React, {useRef, useState} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import PagerView from 'react-native-pager-view';
import ButtonComponent from '../components/OullinedButtonComponent';
import {storagePropertiesName} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {mmkvStorage} from 'src/libs/mmvkStorage';
import {useMMKVStorage} from 'react-native-mmkv-storage';

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [_, setShouldWelcome] = useMMKVStorage(
    storagePropertiesName.isFristTime,
    mmkvStorage,
    true,
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pagerViewRef = useRef<PagerView>(null);

  const imageList = [
    require('../../../assets/images/guitar-background.jpg'),
    require('../../../assets/images/pianoInstruction-home.jpg'),
    require('../../../assets/images/tennis-team-bg.jpg'),
  ];

  const handleNextPage = () => {
    try {
      if (currentPage === imageList.length - 1) {
        setShouldWelcome(false);
        navigation.replace('Auth');
      } else {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        pagerViewRef.current?.setPage(nextPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      pagerViewRef.current?.setPage(prevPage);
    }
  };

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerViewRef}
        style={styles.pagerView}
        initialPage={currentPage}
        scrollEnabled={false}>
        {imageList.map((image, index) => (
          <View key={index} style={styles.page}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </PagerView>
      <View style={styles.buttonContainer}>
        <ButtonComponent title="Previous" onPress={handlePreviousPage} />
        <ButtonComponent title="Next" onPress={handleNextPage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 20,
  },
});

export default WelcomeScreen;
