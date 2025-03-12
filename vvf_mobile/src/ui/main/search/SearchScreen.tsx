import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TextInputComponent from 'src/ui/components/TextInputComponent';
import {debouce} from 'src/utils/debouce';
import axiosInstance from 'src/services/apis/axios';
import {Post} from 'src/data/post';
import PostListItem from '../home/components/PostListItem';

const SearchScreen = () => {
  const [posts, setPost] = useState<Post[]>([]);

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
        placeHolder="Search posts"
        type="normal"
        iconName="search"
        style={styles.searchInput}
      />
      <FlatList
        data={posts}
        renderItem={({item}) => <PostListItem post={item} />}
        ListEmptyComponent={
          <ActivityIndicator style={styles.activityIndicator} size={'large'} />
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
  activityIndicator: {
    position: 'absolute',
    bottom: (Dimensions.get('window').height - 40) / 2,
    left: Dimensions.get('window').width / 2,
  },
  resultList: {
    marginHorizontal: 10,
  },
});

export default SearchScreen;
