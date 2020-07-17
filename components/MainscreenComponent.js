import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { addProfile, fetchProfiles, addSessionName } from '../redux/ActionCreators';
import TopTabNavigator from '../navigation/TopTabNavigator';
import { firebase } from "@react-native-firebase/auth"

const mapStateToProps = state => {
  return {
    profiles: state.profiles,
    sessions: state.sessions
  }
}

const mapDispatchToProps = dispatch => ({
  addProfile: (phone, user) => dispatch(addProfile(phone, user)),
  fetchProfiles: (phone) => dispatch(fetchProfiles(phone)),
  addSessionName: (name) => dispatch(addSessionName(name)),
})

const Stack = createStackNavigator();


function MainScreen(props) {

  useEffect(() => {  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.addSessionName(user.phoneNumber);
        props.fetchProfiles(user.phoneNumber)
        props.addProfile(user.phoneNumber, props.sessions.sessions);
      }
    });    
  }, []);

  return(
    <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Root" component={TopTabNavigator} />
    </Stack.Navigator>
        </NavigationContainer>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
