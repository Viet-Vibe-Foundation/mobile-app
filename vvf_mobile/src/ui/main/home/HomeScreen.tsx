import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import EventCard from './components/EventCard';
import PostListItem from './components/PostListItem';
import {useTranslation} from 'react-i18next';
import {getPosts} from 'src/services/postService';
import {getEvents} from 'src/services/eventService';
import ResponseDTO from '@data/responseDTO';
import {Event} from '@data/event';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@libs/redux/store';
import {updatePost} from '@libs/redux/postSlice';

const HomeScreen = () => {
  const {t} = useTranslation();
  const posts = useSelector((state: RootState) => state.post);
  const [postPageNum, setPostPageNum] = useState<number>(0);
  const [events, setEvents] = useState<ResponseDTO<Event[]>>({
    data: [],
    pageNum: 0,
    total: 0,
  });
  const [isEventsLoading, setEventLoading] = useState<boolean>(true);
  const [isPostsLoading, setPostsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Event doesn't need to update anything
  useEffect(() => {
    getEventByPageNum(events.pageNum ?? 0);
  }, [events.pageNum]);

  useEffect(() => {
    const getPostsByPageNum = async (pageNum: number) => {
      setPostsLoading(true);

      const postResponse = await getPosts(pageNum);
      dispatch(updatePost(postResponse));
      setPostsLoading(false);
    };
    getPostsByPageNum(postPageNum);
  }, [postPageNum, dispatch]);

  const handlePostEndReached = () => {
    if (!isPostsLoading && (posts.data?.length ?? 0) < (posts.total ?? 0)) {
      setPostPageNum(prev => prev + 1);
    }
  };

  const handleEventEndReached = () => {
    if (!isEventsLoading && (events.data?.length ?? 0) < (events.total ?? 0)) {
      setEvents(prev => ({...prev, pageNum: (prev.pageNum ?? 0) + 1}));
    }
  };

  const getEventByPageNum = async (pageNum: number) => {
    setEventLoading(true);
    const eventResponse = await getEvents(pageNum);
    setEvents(prev => ({
      ...prev,
      data: [...(prev.data ?? []), ...(eventResponse?.data ?? [])],
      total: eventResponse?.total ?? 0,
    }));
    setEventLoading(false);
  };

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <View>
          <Text style={styles.sectionHeader}>{t('events')}</Text>
          <FlatList
            data={events?.data}
            renderItem={({item}) => <EventCard event={item} />}
            horizontal
            keyExtractor={(item, index) => `event-${item.id}-${index}`}
            showsHorizontalScrollIndicator={false}
            onEndReached={handleEventEndReached}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={
              isEventsLoading ? (
                <ActivityIndicator
                  style={styles.activityIndicator}
                  size={'large'}
                />
              ) : (
                <Text style={styles.emptyText}>No Data</Text>
              )
            }
            showsVerticalScrollIndicator={true}
            ListFooterComponent={
              isEventsLoading &&
              events.data &&
              events.total &&
              events.data?.length < events.total ? (
                <View style={styles.rightIndicatorWrapper}>
                  <ActivityIndicator
                    size="small"
                    style={styles.activityIndicator}
                  />
                </View>
              ) : null
            }
          />

          <Text style={styles.sectionHeader}>{t('posts')}</Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
      data={posts.data}
      keyExtractor={(item, index) => `post-${item.id}-${index}`}
      renderItem={({item}) => <PostListItem post={item} />}
      onEndReached={handlePostEndReached}
      ListEmptyComponent={
        isPostsLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Text style={styles.emptyText}>No Data</Text>
        )
      }
      ListFooterComponent={
        isPostsLoading &&
        posts.data &&
        posts.total &&
        posts.data?.length < posts.total ? (
          <ActivityIndicator style={styles.bottomIndicator} size={'large'} />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    color: 'gray',
  },
  bottomIndicator: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  rightIndicatorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    minWidth: 60,
  },
  activityIndicator: {
    marginVertical: 20,
    alignSelf: 'center',
  },
});

export default HomeScreen;
