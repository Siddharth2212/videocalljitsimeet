import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import Main from './components/MainComponent';
import MainScreen from './components/MainscreenComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();
export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log("HEREEEEE");
    console.log(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    // auth().signOut();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  

  if (initializing) return null;

  if (!user) {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
    <MainScreen/>
      </Provider>
  );
}