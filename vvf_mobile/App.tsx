import React from 'react';
import GlobalRoute from './src/routes/GlobalRoute';
import { NavigationContainer } from '@react-navigation/native';


const App = (): React.ReactNode => {

  return <NavigationContainer>
    <GlobalRoute />
    </NavigationContainer>
}

export default App;
