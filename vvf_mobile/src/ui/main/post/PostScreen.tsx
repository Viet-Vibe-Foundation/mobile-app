import {StyleSheet, ActivityIndicator, ScrollView, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import axiosInstance from '@libs/apis/axios';
import {Post} from '@data/post';
import ResponseDTO from '@data/responseDTO';
import HtmlComponent from '@components/HtmlComponent';
import {useDispatch, useSelector} from 'react-redux';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storagePropertiesName} from '@constants';
import {User} from '@data/user';
import {mmkvStorage} from '@libs/mmvkStorage';
import {likePost} from '@libs/redux/postSlice';
import DraggableFloattingButton from '@components/DraggableFloattingButton';
import {RootState} from '@libs/redux/store';

type PostScreenParams = {
  postId: string;
};

const PostScreen = () => {
  const route = useRoute<RouteProp<{params: PostScreenParams}, 'params'>>();
  const {postId} = route.params;
  const authToken = useSelector((state: RootState) => state.auth);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<Post | null>(null);
  const [isLiked, setLiked] = useState<boolean>(postContent?.liked || false);
  const dispatch = useDispatch();
  const navigate = useNavigation<any>();
  const [user, _] = useMMKVStorage<User | null>(
    storagePropertiesName.userInfo,
    mmkvStorage,
    null,
  );

  useEffect(() => {
    const fetchPostContent = async (requestPostId: String) => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<ResponseDTO<Post>>(
          `/posts/get?postId=${requestPostId}`,
        );
        if (res.data && res.data.data) {
          setPostContent(res.data.data);
          setLiked(res.data.data.liked || false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostContent(postId);
  }, [postId]);

  const handleLikePost = async () => {
    if (!authToken.isAuth) {
      navigate.navigate('Auth');
      return;
    }
    try {
      setLiked(prev => !prev);
      dispatch(
        likePost({postId, action: isLiked === false ? 'like' : 'dislike'}),
      );
      await axiosInstance.patch(`/posts/likes/${postId}`, {
        userId: user?.id,
        action: `${isLiked === false ? 'like' : 'dis-like'}`,
      });
    } catch (error) {
      console.log(error);
    }
    console.log('Press');
  };

  return (
    <>
      <DraggableFloattingButton
        icon={isLiked ? 'thumb-down' : 'thumb-up'}
        onPress={handleLikePost}
      />
      <ScrollView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={'large'} style={styles.activityIndicator} />
        ) : postContent?.content ? (
          <>
            <Text style={styles.postTitle}>{postContent.title}</Text>
            <HtmlComponent html={postContent.content} />
          </>
        ) : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 25,
  },
  activityIndicator: {
    alignSelf: 'center',
  },
  postTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PostScreen;
