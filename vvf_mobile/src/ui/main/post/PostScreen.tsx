import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {RouteProp, useRoute} from '@react-navigation/native';
import axiosInstance from 'src/services/apis/axios';
import {Post} from 'src/data/post';
import ResponseDTO from 'src/data/responseDTO';
import HtmlComponent from 'src/ui/components/HtmlComponent';

type PostScreenParams = {
  postId: string;
};

const PostScreen = () => {
  const route = useRoute<RouteProp<{params: PostScreenParams}, 'params'>>();
  const {postId} = route.params;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<Post | null>(null);

  useEffect(() => {
    fetchPostContent();
  }, []);

  const fetchPostContent = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get<ResponseDTO<Post>>(
        `/posts/${postId}`,
      );
      if (res.data && res.data.success && res.data.data) {
        setPostContent(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(postId);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          {postContent?.content ? (
            <HtmlComponent html={postContent.content} />
          ) : null}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PostScreen;
