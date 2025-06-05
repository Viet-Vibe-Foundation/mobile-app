import React from 'react';
import GlobalRoute from './src/routes/GlobalRoute';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '@libs/redux/store';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LanguageBottomSheet from '@components/LanguageBottomSheet';

const App = (): React.ReactNode => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer>
          <Provider store={store}>
            <GlobalRoute />
            <LanguageBottomSheet />
          </Provider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
