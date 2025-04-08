import React from 'react';
import GlobalRoute from './src/routes/GlobalRoute';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/libs/redux/store';
import {Provider} from 'react-redux';

const App = (): React.ReactNode => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <GlobalRoute />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
