import React from 'react';
import {SafeAreaView} from 'react-native';
import LazyLoader from './src/components/LazyLoader';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <LazyLoader />
    </SafeAreaView>
  );
};

export default App;
