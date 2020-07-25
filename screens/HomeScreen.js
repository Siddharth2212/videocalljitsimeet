import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { Loading } from "../components/LoadingComponent"
import { addSessionName } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { firebase } from "@react-native-firebase/auth"

const mapStateToProps = state => {
  return {
    profiles: state.profiles,
    sessions: state.sessions,
  }
}

const mapDispatchToProps = dispatch => ({
  addSessionName: (name) => dispatch(addSessionName(name)),
})

function HomeScreen(props) {
  useEffect(() => {
    console.log("__here____here__aegj;_ahego");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.phoneNumber);
        // username = user.phoneNumber;
        socket.send({
          type: "login",
          name: user.phoneNumber
             })
      }
    });   
  }, []);

  function callUser(item){
    let name = item.name;
    let phone = item.phone;
    console.log(name+phone);
  }

  if (props.profiles.isLoading) {
    return <Loading text="Loading" />
  }
  else {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={props.profiles.profiles}
          renderItem={({ item }) => (
            <ListItem
              topDivider
              title={item.name}
              subtitle={
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Icon
                      raised
                      name='call'
                      color='blue'
                      onPress={() => callUser(item)} />
                  </View>
                </View>
              }
              bottomDivider
              chevron
            />
          )}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);