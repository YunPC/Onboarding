import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import {RootStackParamList} from './@types';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  return (
    <SafeAreaView>
      <View style={styles.center}>
        <Button
          title="Go Random"
          onPress={() => navigation.navigate('Random')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default HomeScreen;
