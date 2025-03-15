import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import TextInputComponent from 'src/ui/components/TextInputComponent';
import {debouce} from 'src/utils/debouce';
import axiosInstance from 'src/services/apis/axios';
import {Post} from 'src/data/post';
import PostListItem from '../home/components/PostListItem';
import {useTranslation} from 'react-i18next';

const SearchScreen = () => {
  const [posts, setPost] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {t} = useTranslation();

  const handleSearch = async (searchString: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/posts/search?searchText=${searchString.trim()}`,
      );
      if (res.data.data) {
        setPost(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInputComponent
        onChangeText={val => debouce(() => handleSearch(val), 1000)}
        onSubmitEditting={({nativeEvent}) => handleSearch(nativeEvent.text)}
        placeHolder={`${t('search_post')}`}
        type="normal"
        iconName="search"
        style={styles.searchInput}
      />
      <FlatList
        data={posts}
        renderItem={({item}) => <PostListItem post={item} />}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator style={styles.indicator} size="large" />
          ) : (
            <Text style={styles.indicator}>No content</Text>
          )
        }
        style={styles.resultList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    margin: 20,
  },
  indicator: {
    position: 'absolute',
    top: Dimensions.get('window').height / 4,
    left: Dimensions.get('window').width / 2.5,
  },
  resultList: {
    marginHorizontal: 10,
  },
});

export default SearchScreen;
