import ResponseDTO from '@data/responseDTO';
import axiosInstance from '../libs/apis/axios';
import {Post} from '@data/post';
import {Alert} from 'react-native';

export const getPosts = async (pageNum: number = 1) => {
  try {
    const res = await axiosInstance.get<ResponseDTO<Post[]>>(
      `/posts/get?isPublished=true&pageNum=${pageNum}`,
    );
    const newPosts = res.data.data || [];
    if (newPosts.length === 0) {
      return;
    }
    return {
      data: newPosts,
      total: res.data.total,
    };
  } catch (error: any) {
    console.error(error);
    Alert.alert('Error', 'Failed to load posts. Please try again.');
  }
};
