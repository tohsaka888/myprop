/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Tabs from './Tabs';

const App = () => {
  const data = [
    {title: 'title1', content: '111111111111111111111111111111111111111'},
    {title: 'title2', content: '22222222222222222222222222222222222222'},
    {title: 'title3', content: '33333333333333333333333333333333333333'}
  ];
  return (
    <>
      <View>
        <Tabs data={data}/>
      </View>
    </>
  );
};

export default App;
