import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import TextInputComponent from '@components/TextInputComponent';
import {debouce} from 'src/utils/debouce';
import axiosInstance from '@libs/apis/axios';
import {Post} from '@data/post';
import PostListItem from '../home/components/PostListItem';
import {useTranslation} from 'react-i18next';
import {getPosts} from 'src/services/postService';
import {useAppColor} from 'src/hooks/useAppColor';

const SearchScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {t} = useTranslation();
  const theme = useAppColor();

  useEffect(() => {
    getPostsByPageNum(0);
  }, []);

  const handleSearch = async (searchString: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/posts/get?searchText=${searchString.trim()}`,
      );
      if (res.data.data) {
        setPosts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getPostsByPageNum = async (pageNum: number) => {
    const postResponse = await getPosts(pageNum);
    setPosts(prev => [...(prev ?? []), ...(postResponse?.data ?? [])]);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
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
        ListHeaderComponent={
          <Text style={[styles.listHeader, {color: theme.onPrimary}]}>
            {t('result')}
          </Text>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator style={styles.indicator} size="large" />
          ) : null
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
  listHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
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
