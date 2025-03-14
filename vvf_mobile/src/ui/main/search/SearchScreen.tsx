import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  FlatList,
  Text,
} from 'react-native';
import TextInputComponent from 'src/ui/components/TextInputComponent';
import {debouce} from 'src/utils/debouce';
import axiosInstance from 'src/services/apis/axios';
import {Post} from 'src/data/post';
import PostListItem from '../home/components/PostListItem';
import {useTranslation} from 'react-i18next';

const SearchScreen = () => {
  const [posts, setPost] = useState<Post[]>([]);
  const {t} = useTranslation();

  const handleSearch = async (searchString: string) => {
    try {
      const res = await axiosInstance.get(
        `/posts/search?searchText=${searchString.trim()}`,
      );
      if (res.data.data) {
        setPost(res.data.data);
      }
    } catch (error) {
      console.log(error);
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
        ListEmptyComponent={<Text>No content</Text>}
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
  resultList: {
    marginHorizontal: 10,
  },
});

export default SearchScreen;
