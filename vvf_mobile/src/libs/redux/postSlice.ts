import {Post} from '@data/post';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface PostState {
  data: Post[];
  total: number;
}

const initialState: PostState = {
  data: [],
  total: 0,
};

export const postSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    updatePost: (
      state,
      action: PayloadAction<
        | {
            data: Post[];
            total: number | undefined;
          }
        | undefined
      >,
    ) => {
      if (action.payload) {
        state.data = [...(state.data ?? []), ...action.payload.data];
        state.total = action.payload.total ?? 0;
      }
    },
    likePost: (
      state,
      action: PayloadAction<{
        postId: string;
        action: 'like' | 'dislike';
      }>,
    ) => {
      const {postId, action: likeAction} = action.payload;
      const postIndex = state.data.findIndex(item => item.id === postId);
      if (postIndex !== -1) {
        let likeCount = state.data[postIndex]._count.postLikes;
        state.data[postIndex]._count.postLikes =
          likeAction === 'like' ? likeCount! + 1 : likeCount! - 1;
      }
    },
  },
});

export const {updatePost, likePost} = postSlice.actions;

export default postSlice.reducer;
