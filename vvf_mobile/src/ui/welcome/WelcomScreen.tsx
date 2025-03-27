import React, {useRef, useState} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import PagerView from 'react-native-pager-view';
import {storagePropertiesName} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {mmkvStorage} from 'src/libs/mmvkStorage';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import FilledButtonComponent from '../components/FilledButtonComponent';

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
        navigation.replace('Main');
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
        <FilledButtonComponent
          title="Previous"
          onPress={handlePreviousPage}
          style={styles.button}
        />
        <FilledButtonComponent
          title="Next"
          onPress={handleNextPage}
          style={styles.button}
        />
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
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default WelcomeScreen;
