export type AuthStackParamList = {
  SignIn: {fromPost?: boolean} | undefined;
  SignUp: undefined;
};

export type MainStackParamList = {
  Index: undefined;
  Post: {postId: string};
  EventDetail: {eventId: string};
  UserProfile: undefined;
};

export type GlobalStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Main: undefined;
};
